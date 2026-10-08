"use client";

import { useEffect, useState } from "react";

interface IProduct {
  id: string;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const PriceIncrease = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
      );

      const data: IProduct[] = await response.json();

      const increasedProducts = data.filter(
        (product) => product.change.dir === "up",
      );

      setProducts(increasedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto rounded-xl bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xl text-red-500">🔺</span>

        <h2 className="text-xl font-bold text-gray-800">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            {/* Product Info */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                {product.image}
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  টাকা/কেজি
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400">
                  আজকের দাম
                </p>

                <p className="mt-1 text-xl font-extrabold text-gray-900">
                  {product.today}{" "}
                  <span className="text-sm font-medium text-gray-600">
                    টাকা
                  </span>
                </p>
              </div>

              {/* Increase Percentage */}
              <div className="flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                <span>🔺</span>
                <span>{product.change.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceIncrease;