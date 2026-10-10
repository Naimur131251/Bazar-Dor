import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: IMarket[];
}

interface IPageProps {
  pDId: string;
}

const toBn = (value: number | string) =>
  Number(value).toLocaleString("bn-BD");

function ProductDetailsFallback() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:py-8">
      <div className="container mx-auto space-y-5">
        <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    </main>
  );
}

async function ProductDetailsContent({ pDId }: IPageProps) {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(pDId)}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    // return (
    //   <main className="container mx-auto p-6">
    //     <p className="rounded-xl bg-white p-6 text-neutral-600">
    //       পণ্যের তথ্য পাওয়া যায়নি।
    //     </p>
    //     <Link href="/" className="mt-4 inline-block text-green-700">
    //       ← হোমে ফিরে যান
    //     </Link>
    //   </main>
    // );
    notFound()
  }

  const product: IProduct = await res.json();

  if (!product?.nameBn) {
    return (
      <main className="container mx-auto p-6">
        <p className="rounded-xl bg-white p-6">
          পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      </main>
    );
  }

  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : 0;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : 0;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : 0;

  const unitLabel =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "piece"
        ? "পিস"
        : product.unit === "litre"
          ? "লিটার"
          : "ডজন";

  return (
    <main className="min-h-screen px-4 py-5 text-gray-800 sm:px-6 lg:py-8">
      <div className="container mx-auto space-y-5">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>&gt;</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitLabel}
              </p>

              <div className="mt-2 text-xs text-gray-500">
                গতকালের তুলনায় আজ দাম{" "}
                {product.change.dir === "up" ? (
                  <span className="font-bold text-red-600">
                    বেড়েছে · {toBn(product.today - product.yesterday)} টাকা
                  </span>
                ) : product.change.dir === "down" ? (
                  <span className="font-bold text-green-600">
                    কমেছে · {toBn(product.yesterday - product.today)} টাকা
                  </span>
                ) : (
                  <span className="font-bold">একই আছে</span>
                )}
              </div>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex flex-col items-center space-y-1 rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-extrabold text-gray-900">
              {toBn(product.today)}
            </p>

            <p className="text-xs text-gray-500">টাকা / {unitLabel}</p>

            <p
              className={
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {toBn(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="space-y-5 rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-green-700">
                <span className="text-3xl font-bold">
                  {toBn(minPrice)}
                </span>{" "}
                টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সব বাজারের মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
              <p className="mt-2 text-red-600">
                <span className="text-3xl font-bold">
                  {toBn(maxPrice)}
                </span>{" "}
                টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সব বাজারের মধ্যে সর্বাধিক
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-2 text-blue-700">
                <span className="text-3xl font-bold">
                  {toBn(averagePrice)}
                </span>{" "}
                টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর গড় মূল্য
              </p>
            </div>
          </div>

          {/* Market Prices */}
          <h2 className="pt-2 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-6 text-sm text-gray-500">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-140 text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 font-bold text-green-800">
                  <tr>
                    <th className="px-4 py-3">বাজার</th>
                    <th className="px-4 py-3">বিভাগ</th>
                    <th className="px-4 py-3">সর্বনিম্ন</th>
                    <th className="px-4 py-3">সর্বাধিক</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b border-gray-100 even:bg-[#ffffef] last:border-none"
                    >
                      <td className="px-4 py-3 font-medium">
                        {market.market}
                      </td>
                      <td className="px-4 py-3">{market.division}</td>
                      <td className="px-4 py-3">
                        {toBn(market.min)} টাকা
                      </td>
                      <td className="px-4 py-3">
                        {toBn(market.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

async function ProductDetailsRoute({
  params,
}: {
  params: Promise<{ pDId: string }>;
}) {
  const { pDId } = await params;

  return <ProductDetailsContent pDId={pDId} />;
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ pDId: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailsFallback />}>
      <ProductDetailsRoute params={params} />
    </Suspense>
  );
}