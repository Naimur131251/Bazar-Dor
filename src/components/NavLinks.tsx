"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const pathname = usePathname();
  const [navs, setNavs] = useState<Navs[]>([]);

  useEffect(() => {
    const fetchNavs = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
      );

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      setNavs(await res.json());
    };

    void fetchNavs();
  }, []);

  return (
    <nav className="container mx-auto min-w-0 my-2">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap sm:gap-5">
        {navs.map((nav) => {
          const targetPath = `/category/${nav.slug}`;
          const isActive = pathname === targetPath;
          return (
            <Link
              key={nav.id}
              href={`/category/${nav.slug}`}
              className={`flex shrink-0 items-center gap-1 rounded-lg px-3.5 py-2 text-sm sm:text-base ${
                isActive
                  ? "bg-primary text-white font-medium" // অ্যাক্টিভ থাকলে এই স্টাইল পাবে
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{nav.icon}</span>
              <span>{nav.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;
