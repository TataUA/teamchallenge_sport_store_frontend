"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// assets
import cartImg from "@/public/icons/cart/cart-img.png";

// helpers
import getBasketIdFromLocalStorage from "@/helpers/getBasketIdFromLocalStorage";
import { cleanCart } from "@/redux/cart/cartSlice";

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src={cartImg}
          alt="cart"
          width={160}
          height={240}
          className="mb-6"
        />
        <h1 className="text-heading text-2xl font-bold text-title mb-2">
          Дякуємо за замовлення!
        </h1>
        <p className="text-sm font-medium text-common">
          Ваше замовлення вже в дорозі! Деталі відправлені на вашу електронну
          адресу.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center justify-center rounded-xl py-[11px] cursor-pointer w-full text-button font-semibold text-blue
        border-blue border-[1px] hover:bg-blue hover:text-white"
      >
        На головну
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
