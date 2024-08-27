"use client";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { removeFromCart } from "../../actions";

export function DeleteItemButton({ item }: { item: any }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await removeFromCart(item.cartItemID);
  };
  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        aria-label="Remove cart item"
        className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
      >
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white" />
      </button>
    </form>
  );
}
