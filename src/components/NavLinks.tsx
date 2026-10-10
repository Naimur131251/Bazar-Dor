import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
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
    <div className="flex items-center gap-5 mt-5 mx-auto container">
      {navs.map((nav) => (
        <Link
          key={nav.id}
          href={`/category/${nav.slug}`}
          className="flex items-center px-3.5 py-1 gap-1"
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
