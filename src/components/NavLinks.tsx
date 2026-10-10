import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/categories",
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Navs[] = await res.json();

  return (
    <nav className="container mx-auto mt-4 min-w-0 sm:mt-5">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 sm:gap-5">
        {navs.map((nav) => (
          <Link
            key={nav.id}
            href={`/category/${nav.slug}`}
            className="flex shrink-0 items-center gap-1 rounded-lg px-3.5 py-2 text-sm sm:text-base"
          >
            <span>{nav.icon}</span>
            <span>{nav.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
