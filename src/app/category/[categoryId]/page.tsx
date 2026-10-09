interface ICategoryPage {
  categoryId: string;
}

interface ICategoryProduct {
  id: string;
  nameBn?: string;
  productNameBn?: string;
  today?: number;
  todayPrice?: number;
  categoryIcon?: string;
  change: {
    dir: string;
    pct: number;
  };
}

const CategoryPage = async ({ params }: { params: Promise<ICategoryPage> }) => {
  const { categoryId } = await params;
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  const productCount = data.length;

  const products = Array.isArray(data)
    ? data
    : (data.products ?? data.data ?? []);

  const toBanglaNumber = (value?: number) => {
    return value?.toLocaleString("bn-BD") ?? "—";
  };
  return (
    <main className="container mx-auto p-6">
      <div className="bg-white flex gap-2 items-center p-5 rounded-2xl">
        <div className="text-4xl">{data[0].categoryIcon}</div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{data[0].categoryNameBn}</h1>
          <p className="text-neutral-500">
            {toBanglaNumber(productCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white flex justify-end items-center gap-2 p-5 rounded-2xl my-7">
        <span>সাজান</span>
        <span className="border border-neutral-500 rounded-lg px-3 py-1">{`ডিফল্ট >`}</span>
      </div>

      <p className="text-neutral-500 mb-7">
        মোট {toBanglaNumber(productCount)}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: ICategoryProduct) => (
          <div key={product.id} className="rounded-xl bg-white p-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#f7f7f7] rounded-xl text-2xl p-1">
                {product.categoryIcon}
              </div>
              <div>
                <h2 className="font-bold">
                  {product.productNameBn ?? product.nameBn}
                </h2>
                <p className="text-neutral-500">প্রতি কেজি</p>
              </div>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-neutral-500">আজকের দাম</div>
                <div>
                  <span className="font-bold">
                    {toBanglaNumber(product.today)}
                  </span>{" "}
                  টাকা
                </div>
              </div>
              <div className="bg-red-100 text-red-600 px-2 py-1 rounded-xl text-[10px]">
                {product.change.dir == "up" ? <span>🔺</span> : <span>🔻</span>}{" "}
                {product.change.pct}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
