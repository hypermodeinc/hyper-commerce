"use client";

import { addToCart, decreaseItemQuantity } from "../../actions";
import { SubmitButton } from "./submit-button";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: any;
  type: "plus" | "minus";
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "plus") {
      await addToCart(item.cartItemID);
    } else {
      await decreaseItemQuantity(item.cartItemID);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton type={type} />
    </form>
  );
}
