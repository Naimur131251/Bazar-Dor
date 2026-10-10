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
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  if (session?.user) {
    return (
      <div className="relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <button
            type="button"
            aria-label="Open profile menu"
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-[#05893E] text-sm font-semibold uppercase text-white cursor-pointer"
          >
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
          </button>
          {session.user.name?.split(" ")[0]}
          <FaCaretDown className="text-green-700" />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
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
    <div className="flex items-center gap-3">
      <Link href="/sign-in">সাইন ইন</Link>

      <Link
        href="/sign-up"
        className="rounded-xl bg-[#05893E] px-3.5 py-2 text-white"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthControls;
