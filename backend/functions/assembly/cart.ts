import { getCart, upsertCart, deleteCart } from "./crud";
import { Cart, CartItem } from "./types";

export function addToCart(
  cartId: string,
  productId: string,
  quantity: f64,
): Cart {
  const cart = getCart(cartId);

  let itemFound = false;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].productId === productId) {
      cart.items[i].quantity += quantity;
      itemFound = true;
      break;
    }
  }

  if (!itemFound) {
    cart.items.push(new CartItem(productId, quantity));
  }

  upsertCart(cart);
  return cart;
}

export function removeFromCart(cartId: string, productId: string): Cart {
  const cart = getCart(cartId);
  const newItems: CartItem[] = [];

  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].productId !== productId) {
      newItems.push(cart.items[i]);
    }
  }

  cart.items = newItems;

  upsertCart(cart);
  return cart;
}

export function clearCart(cartId: string): string {
  return deleteCart(cartId);
}

export function getCartItems(cartId: string): CartItem[] {
  const cart = getCart(cartId);
  return cart.items;
}
