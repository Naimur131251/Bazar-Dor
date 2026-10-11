import Link from "next/link";

interface IProductCard {
  id: string | number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const toBanglaNumber = (value: number) => value.toLocaleString("bn-BD");

const Products = ({ product }: { product: IProductCard }) => {
  // ডাইনামিক ইউনিট লেবেল তৈরি
  const unitLabel =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "piece"
        ? "পিস"
        : product.unit === "litre"
          ? "লিটার"
          : "ডজন";

  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-800">
            {product.nameBn}
          </h3>
          {/* এখানে ডাইনামিক ইউনিট বসানো হলো */}
          <p className="mt-1 text-xs">প্রতি {unitLabel}</p>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>

        <div
          className={`flex items-center gap-1 rounded-2xl px-2.5 py-1 text-xs font-semibold ${
            product.change.dir === "up"
              ? "bg-red-100 text-error"
              : product.change.dir === "down"
                ? "bg-emerald-100 text-success"
                : "bg-gray-100 text-base-content"
          }`}
        >
          <span>
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}
          </span>
          <span>{toBanglaNumber(product.change.pct)}%</span>
        </div>
      </div>
    </Link>
  );
};

export default Products;
