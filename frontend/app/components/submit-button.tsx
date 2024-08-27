"use client";
import { addToCart, getCart } from "../actions";

export function SubmitButton({ id }: { id: string }) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addToCart(id)
      .then((result) => {
        console.log(result);
        // getCart(cartId)
        //   .then((result) => {
        //     console.log("Product added to cart successfully:", result);
        //   })
        //   .catch((error) => {
        //     console.error("Failed to add to cart:", error);
        //   });
        // console.log("Product added to cart successfully:", result);
      })
      .catch((error) => {
        console.error("Failed to add to cart:", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <button
          type="submit"
          disabled={!product?.isStocked}
          className={`${
            !product?.isStocked
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          } w-full bg-indigo-500 p-2 rounded-full uppercase font-semibold`}
        >
          Add to cart
        </button> */}
      <button
        type="submit"
        disabled={false}
        className="cursor-pointer w-full bg-indigo-500 p-2 rounded-full uppercase font-semibold"
      >
        Add to cart
      </button>
    </form>
  );
}
