"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// helpers
import getBasketIdFromLocalStorage from "@/helpers/getBasketIdFromLocalStorage";

// sclice
import { cleanCart } from "@/redux/cart/cartSlice";
import getBigCartSVG from "@/helpers/getBigCartSVG";

const OrderSuccessPage = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    if (getBasketIdFromLocalStorage()) {
      localStorage.removeItem("basketId");
      localStorage.removeItem("persist:cart");
    }

    dispatch(cleanCart());

    mounted.current = true;
  }, [dispatch]);

  return (
    <div className="flex-1 flex justify-center items-center p-6">
      <div className="flex flex-col items-center justify-center gap-8 w-full md:max-w-[412px]">
        <div className="flex flex-col items-center justify-center text-center">
          {getBigCartSVG("mb-6")}
          <h1 className="text-heading text-2xl font-bold text-title mb-2">
            Дякуємо за замовлення!
          </h1>
          <p className="text-sm font-medium text-common">
            Ваше замовлення вже в дорозі!
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center 
            rounded-xl py-[12px] cursor-pointer w-full text-button font-semibold text-white
          bg-blue hover:bg-active_blue
          "
        >
          На сторінку входу
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
