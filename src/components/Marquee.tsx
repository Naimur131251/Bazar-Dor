import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: string;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const toBanglaNumber = (number: number) => {
  return number
    .toString()
    .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};

const MarqueeContent = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market headlines");
  }

  const headlines: Headlines[] = await res.json();

  return (
    <MarqueeText className="py-1 bg-white" direction="right" duration={10}>
      {headlines.map((h) => (
        <Link
          className="mr-9 flex gap-2"
          href={`/productDetails/${h.id}`}
          key={h.id}
        >
          <span>{h.image}</span>
          <span>{h.nameBn}</span>
          <span>{toBanglaNumber(h.today)} টাকা/কেজি</span>
          <span>{h.change.dir === "up" ? "🔺" : "🔻"}</span>
          <span>{toBanglaNumber(h.change.pct)}%</span>
        </Link>
      ))}
    </MarqueeText>
  );
};

export default MarqueeContent;
