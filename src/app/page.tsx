import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceDecrease from "@/components/PriceDecrease";
import PriceIncrease from "@/components/PriceIncrease";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Banner />
      <PriceIncrease />
      <PriceDecrease />
      <AllProducts />
    </div>
  );
}
