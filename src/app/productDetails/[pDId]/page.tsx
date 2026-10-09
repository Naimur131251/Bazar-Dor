import Link from "next/link";

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
  params: Promise<{ pDId: string }>;
}

const toBn = (value: number | string) => Number(value).toLocaleString("bn-BD");

const ProductDetailsPage = async ({ params }: IPageProps) => {
  const { pDId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${pDId}`,
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    <div>Helloooooooooo</div>;
  }

  const data: IProduct = await res.json();

  if (!data || !data.nameBn) {
    <div>Helloooooooooo</div>;
  }

  const product = data;
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

  return (
    <main className="min-h-screen px-4 py-5 text-gray-800 sm:px-6 lg:py-8">
      <div className="mx-auto container space-y-5">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/">হোম</Link>
          {`>`}
          <Link href={`/category/${product.category}`}>
            {product.categoryNameBn}
          </Link>
          {`>`}
          <span className="font-medium text-gray-800">{product.nameBn}</span>
        </nav>

        <section className="flex justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
              {product.image || product.categoryIcon}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি{" "}
                {(() => {
                  if (product.unit === "kg") {
                    return "কেজি";
                  } else if (product.unit === "piece") {
                    return "পিস";
                  } else if (product.unit === "litre") {
                    return "লিটার";
                  } else {
                    return "ডোজন";
                  }
                })()}
              </p>
              <div className="mb-1 text-xs text-gray-400">
                গতকালের তুলনায় আজ দাম{" "}
                {product.change.dir === "up" ? (
                  <>
                    <span className="font-black">বেড়েছে</span> ·{" "}
                    {product.today - product.yesterday} টাকা
                  </>
                ) : product.change.dir === "down" ? (
                  <>
                    <span className="font-black">কমেছে</span> ·{" "}
                    {product.yesterday - product.today} টাকা
                  </>
                ) : (
                  "একই আছে"
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 space-y-1 flex flex-col items-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-extrabold text-gray-900">
              {toBn(product.today)}
            </p>
            <p className="text-xs text-gray-500">টাকা / কেজি</p>
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

        <section className="rounded-2xl border border-gray-100 bg-white space-y-4 p-5">
          <h2 className="font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-300 rounded-2xl px-6 py-4">
              <p>সর্বনিম্ন দাম</p>
              <p className="text-green-700">
                <span className="text-3xl">
                  {toBn(minPrice)}
                </span>{" "}
                টাকা
              </p>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="border border-gray-300 rounded-2xl px-6 py-4">
              <p>সর্বাধিক দাম</p>
              <p className="text-green-700">
                <span className="text-3xl">
                  {toBn(maxPrice)}
                </span>{" "}
                টাকা
              </p>
              <p>সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="border border-gray-300 rounded-2xl px-6 py-4">
              <p>গড় দাম</p>
              <p className="text-green-700">
                <span className="text-3xl">
                  {toBn(averagePrice)}
                </span>{" "}
                টাকা
              </p>
              <p>প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="text-green-700 font-bold border-b border-gray-200">
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
                      // এখানে even:bg-gray-50/50 ব্যবহার করা হয়েছে (হালকা ধূসর রঙের জন্য)
                      className="border-b border-black even:bg-[#ffffef] last:border-none"
                    >
                      <td className="px-4 py-3 font-medium">{market.market}</td>

                      <td className="px-4 py-3">{market.division}</td>

                      <td className="px-4 py-3">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-3">
                        {market.max.toLocaleString("bn-BD")} টাকা
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
};

export default ProductDetailsPage;
