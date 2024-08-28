import { models } from "@hypermode/functions-as";
import { EmbeddingsModel } from "@hypermode/models-as/models/experimental/embeddings";
import { collections } from "@hypermode/functions-as";
import { getProduct, getCart } from "./crud";
import { ProductSearchResult, ProductSearchObject, consts } from "./types";

export function recommendProductByCart(
  cartId: string,
  maxItems: i32,
): ProductSearchResult {
  const productSearchRes = new ProductSearchResult(
    consts.productNameCollection,
    consts.searchMethod,
    "success",
    "",
  );

  const cart = getCart(cartId);
  if (cart === null) {
    productSearchRes.status = "error";
    productSearchRes.error = "Cart not found";
    return productSearchRes;
  }

  const cartVecs: f32[][] = [];

  for (let i = 0; i < cart.items.length; i++) {
    const vec = collections.getVector(
      consts.productNameCollection,
      consts.searchMethod,
      cart.items[i].Product.id,
    );

    cartVecs.push(vec);
  }

  const sumVec: f32[] = [];

  for (let i = 0; i < cartVecs[0].length; i++) {
    sumVec[i] = 0;
    for (let j = 0; j < cartVecs.length; j++) {
      sumVec[i] += cartVecs[j][i];
    }
  }

  const normalizedVec = normalize(sumVec);

  const cartProductIds = cart.items.map<string>((item) => item.Product.id);

  const semanticSearchRes = collections.searchByVector(
    consts.productNameCollection,
    consts.searchMethod,
    normalizedVec,
    maxItems + cart.items.length,
  );

  if (!semanticSearchRes.isSuccessful) {
    productSearchRes.status = semanticSearchRes.status;
    productSearchRes.error = semanticSearchRes.error;

    return productSearchRes;
  }

  for (let i = 0; i < semanticSearchRes.objects.length; i++) {
    if (cartProductIds.includes(semanticSearchRes.objects[i].key)) {
      continue;
    }
    const searchObj = getSearchObject(
      semanticSearchRes.objects[i].key,
      semanticSearchRes.objects[i].score,
      semanticSearchRes.objects[i].distance,
    );
    productSearchRes.searchObjs.push(searchObj);
  }

  productSearchRes.searchObjs = productSearchRes.searchObjs.slice(0, maxItems);

  return productSearchRes;
}

export function searchProducts(
  query: string,
  maxItems: i32,
  thresholdStars: f32 = 0.0,
  inStockOnly: boolean = false,
): ProductSearchResult {
  const productSearchRes = new ProductSearchResult(
    consts.productNameCollection,
    consts.searchMethod,
    "success",
    "",
  );

  const semanticSearchRes = collections.search(
    consts.productNameCollection,
    consts.searchMethod,
    query,
    maxItems,
    true,
  );

  if (!semanticSearchRes.isSuccessful) {
    productSearchRes.status = semanticSearchRes.status;
    productSearchRes.error = semanticSearchRes.error;

    return productSearchRes;
  }

  if (inStockOnly) {
    for (let i = 0; i < semanticSearchRes.objects.length; i++) {
      const inStockRes = collections.getText(
        consts.isProductStockedCollection,
        semanticSearchRes.objects[i].key,
      );
      const inStock = inStockRes === "true";
      if (!inStock) {
        semanticSearchRes.objects.splice(i, 1);
        i--;
      }
    }
  }

  const rankedResults = reRankAndFilterSearchResultObjects(
    semanticSearchRes.objects,
    thresholdStars,
  );

  for (let i = 0; i < rankedResults.length; i++) {
    const searchObj = getSearchObject(
      rankedResults[i].key,
      rankedResults[i].score,
      rankedResults[i].distance,
    );
    productSearchRes.searchObjs.unshift(searchObj);
  }

  return productSearchRes;
}

function getSearchObject(
  key: string,
  score: f64,
  distance: f64,
): ProductSearchObject {
  return new ProductSearchObject(getProduct(key), score, distance);
}

function reRankAndFilterSearchResultObjects(
  objs: collections.CollectionSearchResultObject[],
  thresholdStars: f32,
): collections.CollectionSearchResultObject[] {
  for (let i = 0; i < objs.length; i++) {
    const starRes = collections.getText(
      consts.productStarCollection,
      objs[i].key,
    );
    const stars = parseFloat(starRes);

    const inStockRes = collections.getText(
      consts.isProductStockedCollection,
      objs[i].key,
    );
    const inStock = inStockRes === "true";
    if (!inStock) {
      objs[i].score *= 0.5;
    }
    objs[i].score *= stars * 0.1;
  }

  objs.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    } else {
      return 0;
    }
  });

  const filteredResults: collections.CollectionSearchResultObject[] = [];
  for (let i = 0; i < objs.length; i++) {
    const starRes = collections.getText(
      consts.productStarCollection,
      objs[i].key,
    );
    const stars = parseFloat(starRes);
    if (stars >= thresholdStars) {
      filteredResults.push(objs[i]);
    }
  }

  return filteredResults;
}

export function miniLMEmbed(texts: string[]): f32[][] {
  const model = models.getModel<EmbeddingsModel>(consts.embeddingModel);
  const input = model.createInput(texts);
  const output = model.invoke(input);

  return output.predictions;
}

// Function to calculate the magnitude of a vector
function magnitude(vec: f32[]): f32 {
  let sum: f32 = 0.0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return f32(Math.sqrt(sum));
}

// Function to normalize a vector
function normalize(vec: f32[]): f32[] {
  const mag = magnitude(vec);
  if (mag == 0) {
    throw new Error("Cannot normalize a zero vector");
  }

  const normalizedVec: f32[] = [];
  for (let i = 0; i < vec.length; i++) {
    normalizedVec.push(vec[i] / mag);
  }

  return normalizedVec;
}
