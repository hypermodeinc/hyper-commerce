import { getCart, recommendProductByCart } from "../../actions";
import { cookies } from "next/headers";
import CartModal from "./cart-modal";

export default async function Cart() {
  const cartId = (await cookies()).get("cartId")?.value;
  let cart;
  let recommended;
  if (cartId) {
    cart = await getCart(cartId);
    recommended = await recommendProductByCart(cartId, 3);
  }

  return (
    <CartModal
      cart={cart}
      recommendedItems={recommended?.data?.recommendProductByCart?.searchObjs}
    />
  );
}
