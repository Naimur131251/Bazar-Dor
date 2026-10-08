import Image from "next/image";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto container px-4 py-4 bg-white">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="overflow-hidden rounded-xl bg-[#05893E] p-2 flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="text-xl font-bold">বাজার দর</span>
            <span className="text-xs text-neutral-500 mt-0.5">
              <CurrentDate />{" "}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200">
            <Image
              src="/profile.jpg"
              alt="Rezwan"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-neutral-700">
            <span>Rezwan </span>
            <span className="text-[5px]">🔻</span>
          </div>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
