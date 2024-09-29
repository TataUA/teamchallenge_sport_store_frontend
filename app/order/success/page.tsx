'use client'

import Image from "next/image";
import Link from "next/link"
import { useEffect } from "react";

import cartImg from "@/public/icons/cart/cart-img.png";

import getBasketIdFromLocalStorage, { setBasketIdToLocalStorage } from "@/helpers/getBasketIdFromLocalStorage";

import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";

const SuccessPage = (props: any) => {

  useEffect(() => {
    if(getBasketIdFromLocalStorage()) {
      localStorage.removeItem('basketId')
    }
    
    createShoppingCartAction()
    .then((data)=>{
      setBasketIdToLocalStorage(data.basketId)
    })
    .catch((error) => {
      console.log("🚀 ~ createShoppingCartAction ~ error:", error)
    })
  },[])

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
          Ваше замовлення вже в дорозі! Деталі відправлені на вашу електронну адресу.
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
  )
}

export default SuccessPage
