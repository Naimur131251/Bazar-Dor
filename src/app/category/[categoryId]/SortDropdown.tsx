"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "default" | "price-asc" | "price-desc";

export default function SortDropdown({ sortBy }: { sortBy: SortOption }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <span className="flex items-center gap-1 rounded-lg border border-neutral-300 pr-1.5">
      <select
        id="sort"
        name="sort"
        value={sortBy}
        className="cursor-pointer bg-transparent outline-none px-3 py-1 text-sm"
        onChange={(e) => {
          const value = e.target.value as SortOption;
          const params = new URLSearchParams(searchParams.toString());

          if (value === "default") {
            params.delete("sort");
          } else {
            params.set("sort", value);
          }

          const query = params.toString();
          router.push(query ? `?${query}` : "?");
        }}
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </span>
  );
}
