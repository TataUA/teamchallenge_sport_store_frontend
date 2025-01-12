"use client";

import React, { useCallback } from "react";

// components
import ShoppingCart from "@/components/ShoppingCart";

// hook
import useCart from "@/hooks/useCart";

// helpers
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

// slice
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/cart/cartSelector";

export default function CartModal() {
  const cart = useSelector(selectCart);
  const [isOpened, handleOpenedCart] = useCart();

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleOpenedCart(false);
      }
    },
    [handleOpenedCart],
  );

  if (!isOpened) {
    document.body.style.overflow = "";

    return null;
  }

  document.body.style.overflow = "hidden";

  return (
    <section
      className="
        fixed z-50 left-0 right-0 bottom-0 top-[64px] md:top-0 md:pt-0 bg-transparent
        flex md:justify-end
      "
    >
      <div
        onClick={handleOverlayClick}
        className=" hidden md:block fixed z-40 left-0 right-0 bottom-0 top-0 bg-gray opacity-80"
      ></div>
      <div
        className="
          bg-white overflow-auto w-full md:max-w-[386px] 2xl:max-w-[500px] z-50 relative
          flex flex-col
        "
      >
        <div
          className={
            "flex flex-col items-center justify-center flex-1 pt-[10px] px-6 md:pt-5 md:px-6 " +
            `${cart?.products.length ? "" : ""}`
          }
        >
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center w-full pt-[10px] pb-4">
            <h3 className="text-heading font-bold leading-140 text-title text-2xl">
              Кошик
              <span className="ml-2 font-semibold text-subheading text-primary">
                ({cart.products.length})
              </span>
            </h3>
            <div
              className="hidden md:block cursor-pointer [&:svg]:w-[18px] [&:svg]:h-[18px]"
              onClick={() => handleOpenedCart(false)}
            >
              {getCloseIconSVG18()}
            </div>
          </div>
          <ShoppingCart />
        </div>
      </div>
    </section>
  );
}
