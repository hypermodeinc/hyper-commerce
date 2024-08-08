"use client";

import { useEffect, useRef, useState } from "react";

function Price({ amount, currencyCode, className }) {
  return (
    <span className={className}>
      {currencyCode} {amount}
    </span>
  );
}

function CloseCart() {
  return <span>X</span>;
}

function OpenCart({ quantity }) {
  return (
    <div>
      <span>Cart</span>
      {quantity > 0 && <span>({quantity})</span>}
    </div>
  );
}

function DeleteItemButton({ item }) {
  return <button>Delete</button>;
}

function EditItemQuantityButton({ item, type }) {
  return <button>{type === "minus" ? "-" : "+"}</button>;
}

export default function CartModal() {
  const cart = {
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
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart.totalQuantity;
    }
  }, [isOpen, cart.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart.totalQuantity} />
      </button>
      {isOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black md:w-[390px]">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">My Cart</p>
              <button aria-label="Close cart" onClick={closeCart}>
                <CloseCart />
              </button>
            </div>
            {cart.lines.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <span className="h-16">🛒</span>
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="flex-grow overflow-auto py-4">
                  {cart.lines.map((item, i) => (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300"
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
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                            <img
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={
                                item.merchandise.product.featuredImage
                                  .altText || item.merchandise.product.title
                              }
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>
                          <div className="flex flex-1 flex-col text-base">
                            <span className="leading-tight">
                              {item.merchandise.product.title}
                            </span>
                            {item.merchandise.title !== "Default Option" && (
                              <p className="text-sm text-neutral-500">
                                {item.merchandise.title}
                              </p>
                            )}
                          </div>
                        </a>
                        <div className="flex h-16 flex-col justify-between">
                          <Price
                            className="flex justify-end space-y-2 text-right text-sm"
                            amount={item.cost.totalAmount.amount}
                            currencyCode={item.cost.totalAmount.currencyCode}
                          />
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
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
                <div className="py-4 text-sm text-neutral-500">
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
                    <p>Taxes</p>
                    <Price
                      className="text-right text-base text-black"
                      amount={cart.cost.totalTaxAmount.amount}
                      currencyCode={cart.cost.totalTaxAmount.currencyCode}
                    />
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                    <p>Shipping</p>
                    <p className="text-right">Calculated at checkout</p>
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                    <p>Total</p>
                    <Price
                      className="text-right text-base text-black"
                      amount={cart.cost.totalAmount.amount}
                      currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                  </div>
                </div>
                <a
                  href={cart.checkoutUrl}
                  className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                >
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
