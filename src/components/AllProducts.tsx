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

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
      );

      const data: IProduct[] = await response.json();

      const increasedProducts = data;

      setProducts(increasedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto rounded-xl mt-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>
        <h3 className="text-lg text-neutral-600">মোট ৩৩টি পণ্য দেখানো হচ্ছে</h3>
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

export default AllProducts;
