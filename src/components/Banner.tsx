import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Banner = () => {
    return (
        <div className="flex justify-between bg-white rounded-2xl my-10 p-3">
            <div>
                <span className="text-[#05893E] bg-[#c7fadd] px-3 py-1 text-sm rounded-[14px] "><CurrentDate /></span>
                <h1 className="font-bold text-4xl my-3">আজকের বাজারের দাম এক নজরে</h1>
                <p className="text-neutral-500 max-w-140 my-5">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className="px-5 py-2.5 rounded-lg bg-[#05893E] text-white cursor-pointer">সব পণ্য দেখুন</button>
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
    );
};

export default Banner;