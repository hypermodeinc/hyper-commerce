// import { getCart, upsertCart, deleteCart } from "./crud";
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

  if (!resultQuantity.isSuccessful) {
    return "error";
  }

  let productIds = collections.getText(
    consts.cartProductIdsCollection,
    cartKey,
  );

  if (productIds) {
    const productIdArray = productIds.split(",");
    if (!productIdArray.includes(productId)) {
      productIds += `,${productId}`;
    }
  } else {
    productIds = productId;
  }

  const resultProductIds = collections.upsert(
    consts.cartProductIdsCollection,
    cartKey,
    productIds,
  );

  return resultProductIds.isSuccessful ? "success" : "error";
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

  const productIds = collections.getText(
    consts.cartProductIdsCollection,
    cartKey,
  );
  const productIdArray = productIds ? productIds.split(",") : [];

  for (let i = 0; i < productIdArray.length; i++) {
    const productId = productIdArray[i];
    const quantityText = collections.getText(
      consts.cartQuantitiesCollection,
      `${cartKey}:${productId}`,
    );
    if (quantityText) {
      const quantity = parseFloat(quantityText);
      items.push(new CartItem(productId, quantity));
    }
  }

  return items;
}
