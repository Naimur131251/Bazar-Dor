import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
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
    // "https://api.api-store.workers.dev/api/bazardor/products",
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market headlines");
  }

  const result = await res.json();
  const headlines: Headlines[] = Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result)
      ? result
      : [];

  return (
    <MarqueeText className="py-1 bg-white" direction="right" duration={10}>
      {headlines.map((h) => {
        // unit-এর অ্যাক্সেস লুপের ভেতরে প্রতিটি আইটেম (h) থেকে নিতে হবে
        const unitLabel =
          h.unit === "kg"
            ? "কেজি"
            : h.unit === "piece"
              ? "পিস"
              : h.unit === "litre"
                ? "লিটার"
                : "ডজন";

        return (
          <Link
            className="mr-9 flex gap-2 items-center"
            href={`/productDetails/${h.id}`}
            key={h.id}
          >
            <span>{h.image}</span>
            <span>{h.nameBn}</span>
            <span>
              {toBanglaNumber(h.today)} টাকা/{unitLabel}
            </span>
            <span>
              {h.change.dir === "up"
                ? "🔺"
                : h.change.dir === "down"
                  ? "🔻"
                  : "—"}
            </span>
            <span>{toBanglaNumber(h.change.pct)}%</span>
          </Link>
        );
      })}
    </MarqueeText>
  );
};

export default MarqueeContent;
