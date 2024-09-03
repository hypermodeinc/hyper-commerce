import { addToCart } from "@/app/actions";
import Link from "next/link";

export function RecommendedProducts({
  recommendedItems,
}: {
  recommendedItems: any;
}) {
  return (
    <div>
      <div className="text-sm text-white/70">We think you might also like:</div>
      <div className="flex">
        {recommendedItems.map((item: any, i: number) => (
          <div key={i} className="p-2 mb-auto">
            <Link href={`/product/${item.product.id}`}>
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
            </Link>
            <div className="flex items-center justify-between mt-2 border border-white/50 rounded-full w-full h-7 pl-2">
              <div className="text-xs text-white/70">${item.product.price}</div>
              <button
                onClick={() => addToCart(item.product.id)}
                className="h-full border-l px-2 border-white/50"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
