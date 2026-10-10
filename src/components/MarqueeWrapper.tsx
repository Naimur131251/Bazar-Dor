import { Suspense } from "react";
import MarqueeContent from "./Marquee";
import MarqueeSkeleton from "./MarqueeSkeleton";

const MarqueeWrapper = () => {
  return (
    <Suspense fallback={<MarqueeSkeleton />}>
      <MarqueeContent />
    </Suspense>
  );
};

export default MarqueeWrapper;
