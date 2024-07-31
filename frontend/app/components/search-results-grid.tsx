import { searchProducts } from "../actions";
import { ProductTile } from "./tile";

export async function SearchResultsGrid({
  searchValue,
  thresholdStars,
  maxItems,
}: {
  searchValue: string;
  thresholdStars: string;
  maxItems: string;
}) {
  const response = await searchProducts(
    searchValue,
    parseInt(maxItems) || 9,
    parseInt(thresholdStars) || 0,
  );

  const products = response?.data?.searchProducts?.searchObjs || [];

  return (
    <div>
      <div>
        {products?.length > 0 ? (
          <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3 ">
            {products.map(
              (
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
                },
                i: number,
              ) => (
                <div key={i} className="h-[40vh]">
                  <ProductTile product={item?.product} />
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="py-4 w-full text-white/40 flex flex-col items-center justify-center">
            <div className="font-semibold text-2xl">
              No items matching your search
            </div>
            <div>
              Try searching again, such as: &quot;Halloween decorations&quot;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
