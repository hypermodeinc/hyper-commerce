import { getProduct } from "../actions";
import Image from "next/image";
import StarRating from "./product-rating";

export async function ProductDetails({ id }: { id: string }) {
  const response = await getProduct(id);
  const product = response?.data?.getProduct;
  return (
    <div className="rounded-lg bg-black border border-stone-700 p-6 w-full h-full flex flex-col md:flex-row">
      <div className="md:w-3/5 rounded-md bg-white flex items-center justify-center relative h-[40vh] md:h-[90vh] md:h-auto mb-2 md:mb-0">
        <Image
          alt={product?.name}
          src={product?.image}
          height="65"
          width="65"
          className="absolute rounded-md w-auto h-full"
        />
      </div>
      <div className="md:w-2/5 pl-4 flex flex-col">
        <div className="mb-4 lg:mb-8 border-b flex flex-col pb-8 border-stone-700">
          <h1 className="text-2xl md:text-4xl font-semibold mb-2">
            {product?.name}
          </h1>
          <div className="rounded-full font-semibold bg-indigo-500 py-2 px-4 mr-auto text-lg">
            ${product?.price}
          </div>
        </div>
        <div className="mb-2">
          <StarRating rating={product?.stars} />
        </div>
        <div className="mb-4 text-sm">
          {product?.isStocked ? (
            <div>In Stock</div>
          ) : (
            <div className="text-red-600">Out of Stock</div>
          )}
        </div>
        <div className="mb-8 text-white/70">{product?.description}</div>
        <button
          disabled={true}
          className="cursor-not-allowed opacity-60 w-full bg-indigo-500 p-2 rounded-full uppercase font-semibold"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
