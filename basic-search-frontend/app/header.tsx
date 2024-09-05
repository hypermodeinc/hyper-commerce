import Search from "./search";
import { Suspense } from "react";
import Logo from "./logo";

export default function Header() {
  return (
    <>
      <div className="md:flex hidden items-center justify-between space-x-4 px-4">
        <Suspense fallback={<div>Loading</div>}>
          <Logo />
        </Suspense>
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>
      <div className="md:hidden items-center justify-between px-4">
        <div className="flex items-center justify-between mb-2">
          <Suspense fallback={<div>Loading</div>}>
            <Logo />
          </Suspense>
        </div>
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>
    </>
  );
}

function SearchSkeleton() {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="peer block w-full h-11 rounded-md border border-stone-700 py-[9px] pl-14 text-sm outline-2 placeholder:text-gray-500 bg-black" />
    </div>
  );
}
