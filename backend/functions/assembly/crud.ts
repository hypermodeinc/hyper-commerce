import { collections } from "@hypermode/functions-as";
import { Product, Cart, CartItemObject, consts } from "./types";

export function upsertProduct(
  id: string,
  name: string,
  category: string,
  price: f32,
  description: string,
  image: string,
  stars: f32,
  isStocked: boolean,
): string {
  let result = collections.upsert(consts.productNameCollection, id, name);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(consts.productCategoryCollection, id, category);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(
    consts.productPriceCollection,
    id,
    price.toString(),
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(
    consts.productDescriptionCollection,
    id,
    description,
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(consts.productImageCollection, id, image);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(
    consts.productStarCollection,
    id,
    stars.toString(),
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.upsert(
    consts.isProductStockedCollection,
    id,
    isStocked.toString(),
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  return id;
}

export function upsertProducts(
  ids: string[],
  names: string[],
  categories: string[],
  prices: f32[],
  descriptions: string[],
  images: string[],
  stars: f32[],
  isStockedArray: boolean[],
): string[] {
  const errors: string[] = [];

  if (
    ids.length !== names.length ||
    ids.length !== categories.length ||
    ids.length !== prices.length ||
    ids.length !== descriptions.length ||
    ids.length !== images.length ||
    ids.length !== stars.length ||
    ids.length !== isStockedArray.length
  ) {
    errors.push("Length of all arrays must be the same");
    return errors;
  }
  let result = collections.upsertBatch(
    consts.productNameCollection,
    ids,
    names,
  );

  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  result = collections.upsertBatch(
    consts.productCategoryCollection,
    ids,
    categories,
  );
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }
  result = collections.upsertBatch(
    consts.productPriceCollection,
    ids,
    prices.map<string>((x) => x.toString()),
  );
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  result = collections.upsertBatch(
    consts.productDescriptionCollection,
    ids,
    descriptions,
  );
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  result = collections.upsertBatch(consts.productImageCollection, ids, images);
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  result = collections.upsertBatch(
    consts.productStarCollection,
    ids,
    stars.map<string>((x) => x.toString()),
  );
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  result = collections.upsertBatch(
    consts.isProductStockedCollection,
    ids,
    isStockedArray.map<string>((x) => x.toString()),
  );
  if (!result.isSuccessful) {
    errors.push(result.error);
    return errors;
  }

  return ids;
}

export function deleteProduct(id: string): string {
  let result = collections.remove(consts.productNameCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.productCategoryCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.productPriceCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.productDescriptionCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.productImageCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.productStarCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  result = collections.remove(consts.isProductStockedCollection, id);
  if (!result.isSuccessful) {
    return result.error;
  }
  return "success";
}

export function deleteProducts(ids: string[]): string {
  for (let i = 0; i < ids.length; i++) {
    const res = deleteProduct(ids[i]);
    if (res !== "success") {
      return "Error deleting product with id: " + ids[i];
    }
  }

  return "success";
}

export function getProduct(id: string): Product {
  const name = collections.getText(consts.productNameCollection, id);
  const category = collections.getText(consts.productCategoryCollection, id);
  const priceRes = collections.getText(consts.productPriceCollection, id);
  const price = parseFloat(priceRes);
  const description = collections.getText(
    consts.productDescriptionCollection,
    id,
  );
  const image = collections.getText(consts.productImageCollection, id);
  const starRes = collections.getText(consts.productStarCollection, id);
  const stars = parseFloat(starRes);
  const isStockedRes = collections.getText(
    consts.isProductStockedCollection,
    id,
  );
  const isStocked = isStockedRes === "true";

  return new Product(
    id,
    name,
    category,
    f32(price),
    description,
    image,
    f32(stars),
    isStocked,
  );
}

export function getProducts(ids: string[]): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < ids.length; i++) {
    products.push(getProduct(ids[i]));
  }
  return products;
}

export function upsertCart(cartId: string, cartItemIds: string): string {
  const result = collections.upsert(
    consts.cartsCollection,
    cartId,
    cartItemIds,
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  return cartId;
}

function upsertCartQuantity(cartItemId: string, quantity: f64): string {
  const result = collections.upsert(
    consts.cartItemsCollection,
    cartItemId,
    quantity.toString(),
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  return cartItemId;
}

export function addToCart(cartId: string, productId: string): string {
  const cart = collections.getText(consts.cartsCollection, cartId);
  const cartItemId = cartId + "_" + productId;

  if (cart === null || cart === "") {
    const upsertResult = upsertCart(cartId, productId);
    if (upsertResult !== cartId) {
      console.log("Failed to create new cart:");
      return upsertResult;
    }

    const quantityResult = upsertCartQuantity(cartItemId, 1);
    if (quantityResult !== cartItemId) {
      console.log("Failed to set initial quantity:");
      return quantityResult;
    }
  } else {
    const cartItems = cart.split(",");
    if (cartItems.includes(productId)) {
      const cartItemQuantity = collections.getText(
        consts.cartItemsCollection,
        cartItemId,
      );

      if (cartItemQuantity === null || cartItemQuantity === "") {
        console.log("Failed to retrieve cart item quantity for:");
        return "error";
      }

      const newQuantity = parseFloat(cartItemQuantity) + 1;
      const upsertQuantityResult = collections.upsert(
        consts.cartItemsCollection,
        cartItemId,
        newQuantity.toString(),
      );

      if (!upsertQuantityResult.isSuccessful) {
        console.log("Failed to update quantity:");
        return upsertQuantityResult.error;
      }
    } else {
      const upsertResult = upsertCart(cartId, cart + "," + productId);
      if (upsertResult !== cartId) {
        console.log("Failed to update cart with new product:");
        return upsertResult;
      }

      const quantityResult = upsertCartQuantity(cartItemId, 1);
      if (quantityResult !== cartItemId) {
        console.log("Failed to add new product quantity:");
        return quantityResult;
      }
    }
  }

  return "success";
}

export function removeFromCart(cartId: string, productId: string): string {
  const cartItemId = cartId + "_" + productId;
  const result = collections.remove(consts.cartItemsCollection, cartItemId);
  if (!result.isSuccessful) {
    return result.error;
  }
  return "success";
}
export function getCart(cartId: string): Cart {
  const cartItemIds = collections.getText(consts.cartsCollection, cartId);
  if (cartItemIds === "") {
    return new Cart(cartId, []);
  }
  const cartItems = cartItemIds.split(",");
  const items = new Array<CartItemObject>();
  for (let i = 0; i < cartItems.length; i++) {
    const quantity = collections.getText(
      consts.cartItemsCollection,
      cartId + "_" + cartItems[i],
    );
    const product = getProduct(cartItems[i]);
    const cartItemObject = new CartItemObject(
      product,
      parseFloat(quantity),
      cartItems[i],
    );
    items.push(cartItemObject);
  }
  return new Cart(cartId, items);
}
