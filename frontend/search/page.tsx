import { AdvancedSearch } from "../components/advanced-search";
import { Suspense } from "react";
import {
  SearchSkeleton,
  AdvancedSearchSkeleton,
} from "../components/skeletons";
import { SearchResultsGrid } from "../components/search-results-grid";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    q: searchValue,
    rating: thresholdStars,
    itemsPerPage: maxItems,
  } = searchParams as {
    [key: string]: string;
  };

  return (
    <div className="px-4 flex md:flex-row flex-col md:space-x-4 space-y-4 md:space-y-0">
      <div className="w-full md:w-64 space-y-4 text-stone-400 bg-stone-900 p-2 rounded mb-auto">
        <Suspense fallback={<AdvancedSearchSkeleton />}>
          <AdvancedSearch />
        </Suspense>
      </div>
      <div className="w-full">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResultsGrid
            searchValue={searchValue}
            thresholdStars={thresholdStars}
            maxItems={maxItems}
          />
        </Suspense>
      </div>
    </div>
  );
}
