
@json
export class product {
  id: string;
  name: string;
  category: string;
  price: f32;
  description: string;
  image: string;
  stars: f32;
  isStocked: boolean;

  constructor(
    id: string,
    name: string,
    category: string,
    price: f32,
    description: string,
    image: string,
    stars: f32,
    isStocked: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.image = image;
    this.stars = stars;
    this.isStocked = isStocked;
  }
}


@json
export class llmObject {
  userResponse: string;
  searchQuery: string;

  constructor(userResponse: string, searchQuery: string) {
    this.userResponse = userResponse;
    this.searchQuery = searchQuery;
  }
}


@json
export class productSearchObject {
  product: product;
  score: f64;
  distance: f64;

  constructor(product: product, score: f64, distance: f64) {
    this.product = product;
    this.score = score;
    this.distance = distance;
  }
}


@json
export class productSearchResult {
  collection: string;
  searchMethod: string;
  status: string;
  error: string;
  searchObjs: productSearchObject[];

  constructor(
    collection: string,
    searchMethod: string,
    status: string,
    error: string,
    searchObjs: productSearchObject[] = [],
  ) {
    this.collection = collection;
    this.searchMethod = searchMethod;
    this.status = status;
    this.error = error;
    this.searchObjs = searchObjs;
  }
}


@json
export class llmSearchResult {
  llmObj: llmObject;
  searchRes: productSearchResult;

  constructor(llmObj: llmObject, searchRes: productSearchResult) {
    this.llmObj = llmObj;
    this.searchRes = searchRes;
  }
}


@json
export class consts {
  static readonly productNameCollection: string = "productNames";
  static readonly productDescriptionCollection: string = "productDescriptions";
  static readonly productCategoryCollection: string = "productCategories";
  static readonly productPriceCollection: string = "productPrices";
  static readonly productImageCollection: string = "productImages";
  static readonly productStarCollection: string = "productStars";
  static readonly isProductStockedCollection: string = "isProductStocked";

  static readonly searchMethod: string = "searchMethod1";
  static readonly embeddingModel: string = "minilm";
  static readonly generationModel: string = "text-generator";
}
