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
  quantity: f64,
): CartItem[] {
  console.log(
    `Adding to cart: cartId = ${cartId}, productId = ${productId}, quantity = ${quantity}`,
  );

  const result = upsertCartProductList(cartId, productId);
  if (result !== "success") {
    console.error(`Error adding product to list: ${result}`);
    return [];
  }

  const currentQuantity = getCartProductQuantity(cartId, productId);
  const newQuantity = currentQuantity + quantity;
  console.log(`Upserting new quantity: ${newQuantity}`);

  const upsertResult = upsertCartProductQuantity(
    cartId,
    productId,
    newQuantity,
  );
  if (upsertResult !== "success") {
    console.error(`Error upserting product quantity: ${upsertResult}`);
    return [];
  }

  return getCart(cartId); // Return the updated cart
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
