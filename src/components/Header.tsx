import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import AuthControls from "./AuthControls";

function HeaderFallback() {
  return (
    <header className="animate-pulse bg-white px-4 py-4">
      <div className="container mx-auto flex items-center justify-between gap-4 pb-4">
        {/* Logo and Website Name */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-200">
            <div className="h-8 w-8 rounded-lg bg-gray-300" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-6 w-24 rounded bg-gray-200" />
            <div className="h-3 w-32 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Auth Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="h-9 w-16 rounded-lg bg-gray-200 sm:w-20" />
          <div className="hidden h-9 w-20 rounded-lg bg-gray-200 sm:block" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto mt-5 flex gap-3 overflow-hidden">
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
      <header className="bg-white px-4 py-4">
        <div className="container mx-auto flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Link href="/">
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

            <div className="flex flex-col">
              <Link href="/"><span className="text-xl font-bold">বাজার দর</span></Link>
              <span className="mt-0.5 text-xs text-neutral-500">
                <CurrentDate />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <AuthControls />
          </div>
        </div>

        <NavLinks />
      </header>
    </Suspense>
  );
};

export default Header;
