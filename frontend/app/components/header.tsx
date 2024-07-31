import Search from "./search";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { SearchInputSkeleton } from "./skeletons";
import Logo from "./logo";

export default function Header() {
  return (
    <>
      <div className="md:flex hidden items-center justify-between space-x-4 px-4">
        <Suspense fallback={<div>Loading</div>}>
          <Logo />
        </Suspense>
        <Suspense fallback={<SearchInputSkeleton />}>
          <Search />
        </Suspense>
        <button className="relative flex h-11 w-11 items-center justify-center rounded-md border transition-colors border-neutral-700 text-white">
          <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
        </button>
      </div>
      <div className="md:hidden items-center justify-between px-4">
        <div className="flex items-center justify-between mb-2">
          <Suspense fallback={<div>Loading</div>}>
            <Logo />
          </Suspense>

          <button className="relative flex h-11 w-11 items-center justify-center rounded-md border transition-colors border-neutral-700 text-white">
            <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
          </button>
        </div>
        <Suspense fallback={<SearchInputSkeleton />}>
          <Search />
        </Suspense>
      </div>
    </>
  );
}
