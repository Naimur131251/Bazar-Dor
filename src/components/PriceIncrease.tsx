"use client";

import { useEffect, useState } from "react";
import Products from "./Products";

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

        <h2 className="text-xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceIncrease;
