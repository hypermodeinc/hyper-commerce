import { Suspense } from "react";
import { searchProducts } from "../actions";
import { TileSkeleton } from "./skeletons";
import { ProductTile } from "./tile";

function ThreeItemGridItem({
  item,
  size,
}: {
  item: {
    product: {
      description: string;
      id: string;
      name: string;
      image: string;
      price: string;
      stars: number;
      isStocked: string;
    };
  };
  size: "full" | "half";
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <div className="relative block aspect-square h-full w-full">
        <Suspense fallback={<TileSkeleton />}>
          <ProductTile size={size} product={item?.product} />
        </Suspense>
      </div>
    </div>
  );
}

export async function ThreeItemGrid() {
  const response = await searchProducts(
    "Items that people of all ages would enjoy",
    3,
    1,
  );

  const topThreeProducts = response?.data?.searchProducts?.searchObjs || [];
  return (
    <section className="mx-auto grid w-full gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 md:max-h-[60vh]">
      <ThreeItemGridItem size="full" item={topThreeProducts[0]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[1]} />
      <ThreeItemGridItem size="half" item={topThreeProducts[2]} />
    </section>
  );
}
