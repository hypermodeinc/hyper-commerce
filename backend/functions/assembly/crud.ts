import { collections } from "@hypermode/functions-as";
import { Product, Cart, consts } from "./types";

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

export function getCartProductList(cartId: string): string {
  return collections.getText(consts.cartProductList, cartId) || "";
}

export function getCartProductQuantity(
  cartId: string,
  productId: string,
): number {
  const key = `${cartId}-${productId}`;
  console.log(`Fetching quantity for key: ${key}`);
  const quantityStr = collections.getText(consts.cartQuantities, key);

  // If the key doesn't exist, default to 0
  if (!quantityStr) {
    console.log(`No quantity found for key: ${key}, defaulting to 0`);
    return 0;
  }

  console.log(`Fetched quantity: ${quantityStr}`);
  return parseInt(quantityStr, 10);
}

export function upsertCartProductList(
  cartId: string,
  productId: string,
): string {
  const existingList =
    collections.getText(consts.cartProductList, cartId) || "";
  if (existingList.indexOf(productId) !== -1) {
    return "success";
  }
  const updatedList = existingList ? `${existingList},${productId}` : productId;
  const result = collections.upsert(
    consts.cartProductList,
    cartId,
    updatedList,
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  return "success";
}

export function upsertCartProductQuantity(
  cartId: string,
  productId: string,
  quantity: f64,
): string {
  const key = `${cartId}-${productId}`;
  const quantityStr = quantity.toString();
  console.log(`Upserting quantity for key: ${key}, value: ${quantityStr}`);

  const result = collections.upsert(consts.cartQuantities, key, quantityStr);

  if (!result.isSuccessful) {
    console.error(
      `Error upserting quantity for key: ${key}, value: ${quantityStr}`,
    );
    return result.error;
  }

  console.log(
    `Successfully upserted quantity for key: ${key}, value: ${quantityStr}`,
  );
  return "success";
}

export function removeCartProductFromList(
  cartId: string,
  productId: string,
): string {
  const existingList =
    collections.getText(consts.cartProductList, cartId) || "";
  const productIds = existingList.split(",");
  let updatedList = "";

  for (let i = 0; i < productIds.length; i++) {
    if (productIds[i] !== productId) {
      if (updatedList.length > 0) {
        updatedList += ",";
      }
      updatedList += productIds[i];
    }
  }

  const result = collections.upsert(
    consts.cartProductList,
    cartId,
    updatedList,
  );
  if (!result.isSuccessful) {
    return result.error;
  }
  return "success";
}

export function removeCartProductQuantity(
  cartId: string,
  productId: string,
): string {
  const key = `${cartId}-${productId}`;
  const result = collections.remove(consts.cartQuantities, key);

  if (!result.isSuccessful) {
    return result.error;
  }
  return "success";
}
