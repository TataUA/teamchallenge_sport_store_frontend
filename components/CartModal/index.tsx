'use client'

import React from "react";

// components
import ShoppingCart from "@/components/ShoppingCart";
import { ClientComponent } from "@/components/ClientComponent";
import { Loader } from "@/components/Loader";

// hook
import useCart from "@/hooks/useCart";
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

export default function CartModal() {

  const [isOpened, handleOpenedCart] = useCart();

  if (!isOpened) {
    document.body.style.overflow = '';

    return null;
  };

  document.body.style.overflow = 'hidden';

  return (
    <section
      className="
        fixed z-50 left-0 right-0 top-[64px] md:top-0 w-full bg-transparent min-h-full max-h-full overflow-auto
        flex md:justify-end
      "
    >
      <div className="fixed z-40 left-0 right-0 w-full bg-gray min-h-full max-h-full opacity-80"></div>
      <div
        className="
          pt-4 px-6 md:pt-7 md:px-6 bg-white overflow-auto w-full md:max-w-[386px] z-50 relative
        "
      >
        <div className="flex items-center justify-center w-full">
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
