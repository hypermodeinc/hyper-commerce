import { ProductTile } from "./tile";
import { searchProducts } from "../actions";
import { Suspense } from "react";
import { TileSkeleton } from "./skeletons";

export async function Carousel() {
  const response = await searchProducts(
    "Items in the Stuffed Animals & Plush Toys category",
    7,
    1,
  );

  const products = response?.data?.searchProducts?.searchObjs || [];
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product?.product?.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <div className="relative block aspect-square h-full w-full">
              <Suspense fallback={<TileSkeleton />}>
                <ProductTile product={product?.product} />
              </Suspense>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
