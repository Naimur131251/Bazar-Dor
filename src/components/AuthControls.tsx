"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const AuthControls = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex animate-pulse items-center gap-2 sm:gap-3">
        <div className="h-9 w-14 rounded-xl bg-gray-200 sm:w-20" />
        <div className="hidden h-9 w-20 rounded-xl bg-gray-200 sm:block" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open profile menu"
          aria-expanded={isOpen}
          className="flex max-w-36.25 cursor-pointer items-center gap-2 sm:max-w-none sm:gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-primary text-sm font-semibold uppercase text-white">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "Profile"}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              session.user.name?.trim().charAt(0) || "U"
            )}
          </span>

          <span className="hidden max-w-32 truncate sm:inline">
            {session.user.name?.split(" ")[0]}
          </span>

          <FaCaretDown className="shrink-0 text-green-700" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 z-50 w-48 max-w-[calc(100vw-1.5rem)] rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
            <div className="border-b border-gray-100 px-3 py-2">
              <p className="truncate text-sm font-semibold text-gray-800">
                {session.user.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap sm:gap-5">
      <Link href="/sign-in" className="rounded-lg py-2 text-sm">
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-xl bg-primary px-2.5 py-2 text-sm text-white sm:px-3.5"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthControls;
