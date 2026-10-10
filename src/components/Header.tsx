import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import AuthControls from "./AuthControls";

function HeaderFallback() {
  return (
    <header className="animate-pulse bg-white px-3 py-3 sm:px-4 sm:py-4">
      <div className="container mx-auto flex items-center justify-between gap-3 pb-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200 sm:h-12 sm:w-12">
            <div className="h-7 w-7 rounded-lg bg-gray-300 sm:h-8 sm:w-8" />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <div className="h-5 w-20 rounded bg-gray-200 sm:h-6 sm:w-24" />
            <div className="h-3 w-28 max-w-full rounded bg-gray-200 sm:w-32" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="h-9 w-14 rounded-lg bg-gray-200 sm:w-20" />
          <div className="hidden h-9 w-20 rounded-lg bg-gray-200 sm:block" />
        </div>
      </div>

      <div className="container mx-auto mt-3 flex gap-3 overflow-x-auto sm:mt-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-20 shrink-0 rounded-lg bg-gray-200 sm:w-24"
          />
        ))}
      </div>
    </header>
  );
}

const Header = () => {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <header className="bg-white px-3 py-3 sm:px-4 sm:py-4">
        <div className="container mx-auto flex items-center justify-between gap-3 pb-4">
          {/* Logo and Website Name */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" className="shrink-0">
              <div className="flex items-center justify-center overflow-hidden rounded-xl bg-primary p-2">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="flex min-w-0 flex-col">
              <Link href="/">
                <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
              </Link>

              <span className="mt-0.5 truncate text-[10px] text-neutral-500 sm:text-xs">
                <CurrentDate />
              </span>
            </div>
          </div>

          {/* Auth Controls */}
          <div className="flex shrink-0 items-center gap-2 text-sm">
            <AuthControls />
          </div>
        </div>

        <NavLinks />
      </header>
    </Suspense>
  );
};

export default Header;
