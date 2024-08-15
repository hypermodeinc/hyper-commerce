import { CartItem, consts } from "./types";
import { collections } from "@hypermode/functions-as";

export function addToCart(
  userId: string,
  cartId: string,
  productId: string,
  quantity: f64,
): string {
  const cartKey = `${userId}:${cartId}`;
  const itemKey = `${cartKey}:${productId}`;
  const existingQuantity = collections.getText(
    consts.cartQuantitiesCollection,
    itemKey,
  );
  let newQuantity = quantity;

  if (existingQuantity) {
    newQuantity += parseFloat(existingQuantity);
  }

  const resultQuantity = collections.upsert(
    consts.cartQuantitiesCollection,
    itemKey,
    newQuantity.toString(),
  );

  const resultProduct = collections.upsert(
    consts.cartProductIdsCollection,
    itemKey,
    productId,
  );

  return resultQuantity.isSuccessful && resultProduct.isSuccessful
    ? "success"
    : "error";
}
export function removeFromCart(
  userId: string,
  cartId: string,
  productId: string,
): string {
  const cartKey = `${userId}:${cartId}`;
  const itemKey = `${cartKey}:${productId}`;
  const resultQuantity = collections.remove(
    consts.cartQuantitiesCollection,
    itemKey,
  );

  const resultProduct = collections.remove(
    consts.cartProductIdsCollection,
    itemKey,
  );

  return resultQuantity.isSuccessful && resultProduct.isSuccessful
    ? "success"
    : "error";
}

export function getCartItems(userId: string, cartId: string): CartItem[] {
  const cartKey = `${userId}:${cartId}`;
  const items: CartItem[] = [];

  const productIds = collections.search(
    consts.cartProductIdsCollection,
    "",
    cartKey,
    100,
  ).objects;

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i].key.split(":")[1];
    const quantity = parseFloat(
      collections.getText(
        consts.cartQuantitiesCollection,
        `${cartKey}:${productId}`,
      ),
    );
    items.push(new CartItem(productId, quantity));
  }

  return items;
}
