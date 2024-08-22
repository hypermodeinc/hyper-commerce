"use client";

import { addToCart, decreaseItemQuantity } from "../../../actions";
import { SubmitButton } from "./submit-button"; // Adjust import path as needed
// import type { CartItem } from "lib/shopify/types";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: any;
  type: "plus" | "minus";
}) {
  console.log(item);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "plus") {
      await addToCart(item.Product.id);
    } else {
      await decreaseItemQuantity(item.Product.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton type={type} />
    </form>
  );
}
