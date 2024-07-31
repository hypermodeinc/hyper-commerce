import { PhotoIcon } from "@heroicons/react/24/outline";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-white/20 before:via-stone-100 before:to-transparent";

export function TileSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-black p-2 shadow-sm w-full h-full border border-stone-800 flex items-center justify-center`}
    >
      <div className="text-white/40 w-1/5 flex flex-col justify-center items-center">
        <PhotoIcon />
      </div>
      <div className="flex items-center absolute bottom-0 left-0 mb-8 ml-8 border border-white/40 text-sm font-semibold rounded-full p-1 w-2/3 overflow-hidden">
        <div className="px-2 truncate w-40 h-7"></div>
        <div className="bg-stone-800 rounded-full p-1 px-2 w-20 h-7"></div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3 ">
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
      <div className="h-[40vh]">
        <TileSkeleton />
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div
      className={`${shimmer}  relative overflow-hidden rounded-lg bg-black border border-stone-700 p-6 w-full h-[90vh] flex`}
    >
      <div className="w-3/5 h-full rounded bg-white/20 relative"></div>
      <div className="w-2/5 pl-4 flex flex-col">
        <div className="bg-white/40 h-12 w-62 rounded-full mb-2"></div>
        <div className="rounded-full font-semibild bg-white/20 h-8 w-20 mr-auto text-lg"></div>
        <hr className="h-px my-8 border-0 bg-stone-700" />
        <div className="mb-1 bg-white/20 w-full h-3 rounded-full"></div>
        <div className="mb-1 bg-white/20 w-full h-3 rounded-full"></div>
        <div className="mb-1 bg-white/20 w-full h-3 rounded-full"></div>
        <div className="mb-1 bg-white/20 w-full h-3 rounded-full"></div>
        <div className="bg-white/20 w-1/3 h-3 rounded-full mb-8"></div>

        <button
          disabled={true}
          className="cursor-not-allowed opacity-60 w-full bg-white/40 h-10 p-2 rounded-full uppercase font-semibold"
        ></button>
      </div>
    </div>
  );
}

export function AdvancedSearchSkeleton() {
  return <div className="w-64 space-y-2 text-stone-400"></div>;
}

export function SearchInputSkeleton() {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="peer block w-full h-11 rounded-md border border-stone-700 py-[9px] pl-14 text-sm outline-2 placeholder:text-gray-500 bg-black" />
    </div>
  );
}
