'use client'

import React, { useCallback } from "react";

// components
import ShoppingCart from "@/components/ShoppingCart";
import { ClientComponent } from "@/components/ClientComponent";
import { Loader } from "@/components/Loader";

// hook
import useCart from "@/hooks/useCart";
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

// slice
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/cart/cartSelector";

export default function CartModal() {

  const cart = useSelector(selectCart)
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
    document.body.style.overflow = '';

    return null;
  };

  document.body.style.overflow = 'hidden';


  return (
    <section
      className="
        fixed z-50 left-0 right-0 bottom-0 top-0 pt-[64px] md:pt-0 bg-transparent
        flex md:justify-end
      "
    >
      <div
        onClick={handleOverlayClick}
        className=" hidden md:block fixed z-40 left-0 right-0 bottom-0 top-0 bg-gray opacity-80"
      ></div>
      <div
        className="
          pt-4 px-6 md:pt-7 md:px-6 bg-white overflow-auto w-full md:max-w-[386px] 2xl:max-w-[500px] z-50 relative
          flex flex-col
        "
      >
        <div
          className={
            "flex flex-col items-center justify-center flex-1 " +
            `${cart?.products.length ? "" : ""}`
          }
        >
          <React.Suspense fallback={<Loader />}>
            <ClientComponent>
              <div
                className="hidden md:block md:absolute right-5 md:right-5 top-7 cursor-pointer [&:svg]:w-[18px] [&:svg]:h-[18px]"
                onClick={() => handleOpenedCart(false)}
              >
                {getCloseIconSVG18()}
              </div>
              <ShoppingCart />
            </ClientComponent>
          </React.Suspense>
        </div>
      </div>
    </section>
  );
}
