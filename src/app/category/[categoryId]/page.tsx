import Link from "next/link";
import { Suspense } from "react";
import SortDropdown from "./SortDropdown";
import { notFound } from "next/navigation";

interface ICategoryPage {
  categoryId: string;
  sortBy: SortOption;
}

interface ICategoryProduct {
  id: number;
  slug: string;
  nameBn?: string;
  productNameBn?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  unit?: string;
  today?: number;
  todayPrice?: number;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

type SortOption = "default" | "price-asc" | "price-desc";

const toBanglaNumber = (value?: number) => {
  return value?.toLocaleString("bn-BD") ?? "—";
};

async function CategoryContent({ categoryId, sortBy }: ICategoryPage) {
  const res = await fetch(
    // `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const products: ICategoryProduct[] = Array.isArray(data)
    ? data
    : (data.products ?? data.data ?? []);

  const firstProduct = products[0];

  const sortedProducts = [...products];

  if (sortBy === "price-asc") {
    sortedProducts.sort(
      (a, b) =>
        (a.today ?? a.todayPrice ?? Infinity) -
        (b.today ?? b.todayPrice ?? Infinity),
    );
  }

  if (sortBy === "price-desc") {
    sortedProducts.sort(
      (a, b) =>
        (b.today ?? b.todayPrice ?? -Infinity) -
        (a.today ?? a.todayPrice ?? -Infinity),
    );
  }

  return (
    <main className="container mx-auto p-4 sm:p-6">
      {/* Category Header */}
      <section className="flex items-center gap-3 rounded-2xl bg-white p-5">
        <div className="text-4xl">{firstProduct?.categoryIcon ?? "🛒"}</div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {firstProduct?.categoryNameBn ?? categoryId}
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Sorting */}
      <div className="my-7 flex items-center justify-end gap-2 rounded-2xl bg-white p-5">
        <span className="text-sm text-neutral-600">সাজান</span>

        <SortDropdown sortBy={sortBy} />
      </div>

      {/* Product Count */}
      <p className="mb-5 text-sm text-neutral-500">
        মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products */}
      {products.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-neutral-500">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const direction = product.change?.dir;

            return (
              <Link
                href={`/productDetails/${product.id}`}
                key={product.id}
                className="rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f7f7f7] text-3xl">
                    {product.image ?? product.categoryIcon ?? "🛒"}
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {product.productNameBn ?? product.nameBn ?? "পণ্যের নাম"}
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      প্রতি{" "}
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit === "litre"
                            ? "লিটার"
                            : "ডজন"}
                    </p>
                  </div>
                </div>

                {/* Price and Change */}
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm text-neutral-500">আজকের দাম</p>

                    <p className="mt-1 text-xl font-extrabold text-gray-900">
                      {toBanglaNumber(product.today ?? product.todayPrice)} টাকা
                    </p>
                  </div>

                  {product.change && (
                    <div
                      className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                        direction === "up"
                          ? "bg-red-100 text-red-600"
                          : direction === "down"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {direction === "up"
                        ? "▲"
                        : direction === "down"
                          ? "▼"
                          : "—"}{" "}
                      {toBanglaNumber(product.change.pct)}%
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

function CategoryFallback() {
  return (
    <main className="container mx-auto space-y-6 p-4 sm:p-6">
      {/* Category Header Skeleton */}
      <section className="flex animate-pulse items-center gap-3 rounded-2xl bg-white p-5">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded-md bg-gray-200" />
        </div>
      </section>

      {/* Sorting Dropdown Skeleton */}
      <div className="my-7 flex animate-pulse items-center justify-end gap-3 rounded-2xl bg-white p-5">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-10 w-36 rounded-lg bg-gray-200" />
      </div>

      {/* Product Count Skeleton */}
      <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />

      {/* Product Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-100 bg-white p-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            </div>

            {/* Price and Change */}
            <div className="mt-5 flex items-end justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-6 w-28 rounded bg-gray-200" />
              </div>

              <div className="h-7 w-16 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

async function CategoryRoute({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string | string[] }>;
}) {
  const [{ categoryId }, query] = await Promise.all([params, searchParams]);
  const requestedSort = Array.isArray(query.sort) ? query.sort[0] : query.sort;
  const sortBy: SortOption =
    requestedSort === "price-asc" || requestedSort === "price-desc"
      ? requestedSort
      : "default";

  return <CategoryContent categoryId={categoryId} sortBy={sortBy} />;
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryRoute params={params} searchParams={searchParams} />
    </Suspense>
  );
}
