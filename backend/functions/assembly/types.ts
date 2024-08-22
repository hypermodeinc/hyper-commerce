
@json
export class Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: f32,
    public description: string,
    public image: string,
    public stars: f32,
    public isStocked: boolean,
  ) {}
}


@json
export class ProductSearchObject {
  constructor(
    public product: Product,
    public score: f64,
    public distance: f64,
  ) {}
}


@json
export class ProductSearchResult {
  constructor(
    public collection: string,
    public searchMethod: string,
    public status: string,
    public error: string,
    public searchObjs: ProductSearchObject[] = [],
  ) {}
}


@json
export class Cart {
  constructor(
    public cartId: string,
    public items: CartItemObject[] = [],
  ) {}
}


@json
export class CartItemObject {
  constructor(
    public Product: Product,
    public quantity: f64,
    public productId: string,
  ) {}
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
  static readonly cartsCollection: string = "carts";
  static readonly cartItemsCollection: string = "cartItems";

  static readonly searchMethod: string = "searchMethod1";
  static readonly embeddingModel: string = "minilm";
}
