"use client";

import { useEffect, useState } from "react";
import Products from "./Products";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-4">
      {/* Product Info */}
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-7 w-28 rounded bg-gray-200" />
        </div>

        <div className="h-7 w-16 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          // "https://api.api-store.workers.dev/api/bazardor/products",
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: IProduct[] = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto mt-8 min-w-0 rounded-xl px-3 sm:mt-10 sm:px-0">
      {/* Header */}
      <div className="mb-2 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl">সব পণ্য</h2>

        {loading ? (
          <div className="h-6 w-48 max-w-full animate-pulse rounded bg-gray-200 sm:w-56" />
        ) : (
          <h3 className="text-base text-neutral-600 sm:text-lg">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </h3>
        )}
      </div>

      {/* Loading Skeleton / Products */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Products key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full rounded-xl bg-white p-6 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
