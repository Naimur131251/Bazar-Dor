
const Products = ({
  product,
}: {
  product: {
    id: string;
    nameBn: string;
    image: string;
    today: number;
    change: {
      dir: string;
      pct: number;
    };
  };
}) => {
  return (
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

          <p className="mt-1 text-xs text-gray-400">টাকা/কেজি</p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {product.today}{" "}
            <span className="text-sm font-medium text-gray-600">টাকা</span>
          </p>
        </div>

        {/* Increase Percentage */}
        <div className="flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
          {product.change.dir == "up" ? <span>🔺</span> : <span>🔻</span> }
          <span>{product.change.pct}%</span>
        </div>
      </div>
    </div>
  );
};

export default Products;
