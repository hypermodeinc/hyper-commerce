import {
  getCartProductList,
  getCartProductQuantity,
  upsertCartProductList,
  upsertCartProductQuantity,
  removeCartProductFromList,
  removeCartProductQuantity,
} from "./crud";
import { CartItem } from "./types";

export function addToCart(
  cartId: string,
  productId: string,
  quantity: number,
): string {
  const result = upsertCartProductList(cartId, productId);
  if (result !== "success") {
    return result;
  }

  const currentQuantity = getCartProductQuantity(cartId, productId);
  const newQuantity = currentQuantity + quantity;
  return upsertCartProductQuantity(cartId, productId, newQuantity);
}

export function removeFromCart(cartId: string, productId: string): string {
  const result = removeCartProductFromList(cartId, productId);
  if (result !== "success") {
    return result;
  }

  return removeCartProductQuantity(cartId, productId);
}

export function getCart(cartId: string): CartItem[] {
  const productList = getCartProductList(cartId);
  const cartItems: CartItem[] = [];

  if (!productList) {
    return cartItems;
  }

  const productIds = productList.split(",");

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = getCartProductQuantity(cartId, productId);
    cartItems.push(new CartItem(productId, quantity));
  }

  return cartItems;
}
