"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { EditItemQuantityButton } from "./edit-quantity";
// function Price({ amount, className }) {
//   return <span className={className}>$ {amount}</span>;
// }

function CloseCart() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx("h-6 transition-all ease-in-out hover:scale-110 ")}
      />
    </div>
  );
}

function OpenCart({ quantity }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border transition-colors border-neutral-700 text-white">
      <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      <div className="flex items-center justify-center flex-none font-bold absolute top-0 bg-indigo-500 text-black w-5 h-5 rounded-full -mt-2 right-0 -mr-2 text-xs text-white">
        {quantity > 0 && <span>{quantity}</span>}
      </div>
    </div>
  );
}

function DeleteItemButton({ item }) {
  return (
    <button
      type="submit"
      aria-label="Remove cart item"
      className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white" />
    </button>
  );
}

// function EditItemQuantityButton({ item, type }) {
//   return (
//     <button
//       type="submit"

//       className={clsx(
//         "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
//         {
//           "ml-auto": type === "minus",
//         }
//       )}
//     >
//       {type === "plus" ? (
//         <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
//       ) : (
//         <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
//       )}
//     </button>
//   );
// }

export default function CartModal({ cart }: { cart: any }) {
  console.log(cart);
  const cartItems = cart.data.getCart.items;
  const cartTest = {
    totalQuantity: 3,
    lines: [
      {
        quantity: 1,
        merchandise: {
          product: {
            handle: "product-1",
            title: "Product 1",
            featuredImage: {
              url: "/path/to/image1.jpg",
              altText: "Product 1 Image",
            },
          },
          title: "Default Option",
          selectedOptions: [{ name: "Size", value: "M" }],
        },
        cost: {
          totalAmount: { amount: "10.00", currencyCode: "USD" },
        },
      },
      {
        quantity: 2,
        merchandise: {
          product: {
            handle: "product-2",
            title: "Product 2",
            featuredImage: {
              url: "/path/to/image2.jpg",
              altText: "Product 2 Image",
            },
          },
          title: "Default Option",
          selectedOptions: [{ name: "Size", value: "L" }],
        },
        cost: {
          totalAmount: { amount: "20.00", currencyCode: "USD" },
        },
      },
    ],
    cost: {
      totalTaxAmount: { amount: "2.00", currencyCode: "USD" },
      totalAmount: { amount: "32.00", currencyCode: "USD" },
    },
    checkoutUrl: "/checkout",
  };

  const [isOpen, setIsOpen] = useState(false);
  // const quantityRef = useRef(cartTest.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // useEffect(() => {
  //   if (cartItems.totalQuantity !== quantityRef.current) {
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }
  //     quantityRef.current = cartTest.totalQuantity;
  //   }
  // }, [isOpen, cartTest.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={1} />
      </button>
      {isOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-700 bg-black p-6 text-white md:w-[390px]">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">My Cart</p>
              <button aria-label="Close cart" onClick={closeCart}>
                <CloseCart />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <span className="h-16">🛒</span>
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="flex-grow overflow-auto py-4">
                  {cartItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-700"
                    >
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -mt-2 ml-[55px]">
                          <DeleteItemButton item={item} />
                        </div>
                        <a
                          href="#"
                          onClick={closeCart}
                          className="z-30 flex flex-row space-x-4"
                        >
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-700 bg-neutral-700">
                            <img
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={item.Product.name}
                              src={item.Product.image}
                            />
                          </div>
                          <div className="flex flex-1 flex-col text-base">
                            <span className="leading-tight">
                              {item.Product.name}
                            </span>
                          </div>
                        </a>
                        <div className="flex h-16 flex-col justify-between">
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-700">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <div className="py-4 text-sm text-neutral-300">
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-700 pb-1">
                    <p>Taxes</p>
                    <Price
                      className="text-right text-base text-white"
                      amount={cartTest.cost.totalTaxAmount.amount}
                      currencyCode={cartTest.cost.totalTaxAmount.currencyCode}
                    />
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-700 pb-1 pt-1">
                    <p>Shipping</p>
                    <p className="text-right">Calculated at checkout</p>
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-700 pb-1 pt-1">
                    <p>Total</p>
                    <Price
                      className="text-right text-base text-white"
                      amount={cartTest.cost.totalAmount.amount}
                      currencyCode={cartTest.cost.totalAmount.currencyCode}
                    />
                  </div>
                </div> */}
                <a className="block w-full rounded-full bg-indigo-500 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">
                  Proceed to Checkout
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
