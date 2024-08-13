import { upsertCart } from "./crud";
import { Cart, CartItem, consts } from "./types";
import { collections } from "@hypermode/functions-as";

export function addToCart(cartId: string, productId: string, quantity: i32): string {
  let cart = collections.getObject<Cart>(consts.cartCollection, cartId);
  if (!cart) {
    cart = new Cart(cartId);
  }
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push(new CartItem(productId, quantity));
  }
  return upsertCart(cartId, cart);
}

export function removeFromCart(cartId: string, productId: string): string {
  let cart = collections.getObject<Cart>(consts.cartCollection, cartId);
  if (!cart) {
    return "Cart not found";
  }
  cart.items = cart.items.filter(item => item.productId !== productId);
  return upsertCart(cartId, cart);
}

export function getCart(cartId: string): Cart {
  const cart = collections.getObject<Cart>(consts.cartCollection, cartId);
  if (!cart) {
    return new Cart(cartId);
  }
  return cart;
}
