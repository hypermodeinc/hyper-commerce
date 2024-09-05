import { Suspense } from "react";
import { searchProducts } from "./actions";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };

  const response = await searchProducts(searchValue, 20, 0);

  const products = response?.data?.searchProducts?.searchObjs || [];

  return (
    <div className="px-4 flex md:flex-row flex-col md:space-x-4 space-y-4 md:space-y-0 w-full">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            {products?.length > 0 ? (
              <div className="">
                {products.map(
                  (
                    item: {
                      product: {
                        description: string;
                        name: string;
                      };
                    },
                    i: number
                  ) => (
                    <div key={i} className="mb-8">
                      <div>
                        <div className="font-semibold text-xl mb-1">
                          {item.product.name}
                        </div>
                        <div className="text-stone-400">
                          {item.product.description}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="py-4 text-white/40 flex flex-col items-center justify-center w-full">
                <div className="font-semibold text-2xl">
                  No items matching your search
                </div>
                <div>
                  Try searching again, such as: &quot;Halloween
                  decorations&quot;
                </div>
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
