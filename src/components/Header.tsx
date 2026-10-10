
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import AuthControls from "./AuthControls";

const Header = () => {
  return (
    <header className="bg-white px-4 py-4">
      <div className="container mx-auto flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex items-center justify-center overflow-hidden rounded-xl bg-[#05893E] p-2">
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
            <span className="mt-0.5 text-xs text-neutral-500">
              <CurrentDate />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <AuthControls />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="container mx-auto mt-5 h-10 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Header;
