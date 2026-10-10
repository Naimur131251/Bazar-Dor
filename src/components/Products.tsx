// import Link from "next/link";

// interface IProductCard {
//   id: string | number;
//   slug: string;
//   nameBn: string;
//   image: string;
//   today: number;
//   unit: string;
//   change: {
//     dir: string;
//     pct: number;
//   };
// }

// const toBanglaNumber = (value: number) =>
//   value.toLocaleString("bn-BD");

// const Products = ({ product }: { product: IProductCard }) => {
//   return (
//     <Link
//       href={`/productDetails/${product.id}`}
//       className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5"
//     >
//       <div className="flex items-start gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-2xl">
//           {product.image}
//         </div>

//         <div>
//           <h3 className="text-base font-bold text-gray-800">
//             {product.nameBn}
//           </h3>
//           <p className="mt-1 text-xs text-gray-400">টাকা/কেজি</p>
//         </div>
//       </div>

//       <div className="mt-6 flex items-end justify-between">
//         <div>
//           <p className="text-xs text-gray-400">আজকের দাম</p>
//           <p className="mt-1 text-xl font-extrabold text-gray-900">
//             {toBanglaNumber(product.today)}{" "}
//             <span className="text-sm font-medium text-gray-600">
//               টাকা
//             </span>
//           </p>
//         </div>

//         <div
//           className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
//             product.change.dir === "up"
//               ? "bg-red-50 text-red-600"
//               : product.change.dir === "down"
//                 ? "bg-emerald-50 text-emerald-600"
//                 : "bg-gray-50 text-gray-500"
//           }`}
//         >
//           <span>
//             {product.change.dir === "up"
//               ? "▲"
//               : product.change.dir === "down"
//                 ? "▼"
//                 : "—"}
//           </span>
//           <span>{toBanglaNumber(product.change.pct)}%</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Products;
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
      href={`/productDetails/${product.id}`}
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
          <p className="mt-1 text-xs text-gray-400">টাকা/{unitLabel}</p>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-sm font-medium text-gray-600">টাকা</span>
          </p>
        </div>

        <div
          className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
            product.change.dir === "up"
              ? "bg-red-50 text-red-600"
              : product.change.dir === "down"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-50 text-gray-500"
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
