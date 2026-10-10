import Image from "next/image";
import CurrentDate from "./CurrentDate";
import { Suspense } from "react";

function BannerFallback() {
  return (
    <div className="my-10 flex animate-pulse flex-col justify-between gap-6 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:p-6">
      {/* Banner Text Skeleton */}
      <div className="flex-1 space-y-5">
        {/* Date */}
        <div className="h-7 w-36 rounded-[14px] bg-gray-200" />

        {/* Heading */}
        <div className="space-y-3">
          <div className="h-9 w-full max-w-lg rounded bg-gray-200" />
          <div className="h-9 w-3/4 max-w-md rounded bg-gray-200" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full max-w-xl rounded bg-gray-200" />
          <div className="h-4 w-5/6 max-w-lg rounded bg-gray-200" />
          <div className="h-4 w-2/3 max-w-md rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* Banner Image Skeleton */}
      <div className="h-55 w-full shrink-0 rounded-xl bg-gray-200" />
    </div>
  );
}

const Banner = () => {
  return (
    <Suspense fallback={<BannerFallback />}>
      <div className="flex justify-between bg-white rounded-2xl my-10 p-5 pl-8">
        <div className="mt-4">
          <span className="text-primary bg-[#c7fadd] px-3 py-1 text-sm rounded-[14px]">
            <CurrentDate />
          </span>
          <h1 className="font-bold text-4xl my-3">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-neutral-500 max-w-140 my-5">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-white cursor-pointer">
            সব পণ্য দেখুন
          </button>
        </div>
        <div>
          <Image
            src="/bazar-hero.png"
            alt="Banner-image"
            width={315}
            height={263}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Banner;
