import Image from "next/image";
import CurrentDate from "./CurrentDate";
import { Suspense } from "react";

function BannerFallback() {
  return (
    <div className="my-6 flex animate-pulse flex-col gap-6 rounded-2xl bg-white p-4 sm:my-8 sm:p-6 lg:my-10 lg:flex-row lg:items-center lg:justify-between lg:p-5 lg:pl-8">
      {/* Banner Text Skeleton */}
      <div className="min-w-0 flex-1 space-y-5">
        <div className="h-7 w-36 rounded-[14px] bg-gray-200" />

        <div className="space-y-3">
          <div className="h-8 w-full max-w-lg rounded bg-gray-200 sm:h-9" />
          <div className="h-8 w-3/4 max-w-md rounded bg-gray-200 sm:h-9" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full max-w-xl rounded bg-gray-200" />
          <div className="h-4 w-5/6 max-w-lg rounded bg-gray-200" />
          <div className="h-4 w-2/3 max-w-md rounded bg-gray-200" />
        </div>

        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* Banner Image Skeleton */}
      <div className="h-48 w-full shrink-0 rounded-xl bg-gray-200 sm:h-56 lg:w-78.75" />
    </div>
  );
}

const Banner = () => {
  return (
    <Suspense fallback={<BannerFallback />}>
      <div className="my-6 flex flex-col gap-6 rounded-2xl bg-white p-4 sm:my-8 sm:p-6 lg:my-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-5 lg:pl-8">
        {/* Banner Text */}
        <div className="min-w-0 flex-1 lg:mt-4">
          <span className="inline-block rounded-[14px] bg-[#c7fadd] px-3 py-1 text-sm text-primary">
            <CurrentDate />
          </span>

          <h1 className="my-3 text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="my-4 max-w-140 text-sm leading-6 text-neutral-500 sm:my-5 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button
            type="button"
            // onClick={() => {
            //   window.location.href = "/products";
            // }}
            className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-white"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Banner Image */}
        <div className="flex w-full shrink-0 justify-center lg:w-78.75 lg:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর - আজকের বাজারের দাম"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-78.75 object-contain"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 315px, 315px"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Banner;
