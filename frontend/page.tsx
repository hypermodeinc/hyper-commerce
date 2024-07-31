import { Carousel } from "./components/carousel";
import { ThreeItemGrid } from "./components/grid";

export default async function Home() {
  return (
    <>
      <div className="px-4 text-xl font-semibold text-white/70 mb-4">
        Top Rated
      </div>
      <ThreeItemGrid />
      <div className="px-4 text-xl font-semibold text-white/70 mb-4">
        Stuffed Animals & Plush Toys
      </div>
      <Carousel />
    </>
  );
}
