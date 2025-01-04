import { useSelector } from "react-redux"
import Link from "next/link";

import { selectCart } from "@/redux/cart/cartSelector"

import { IProduct } from "@/services/types";

const CartFooter = () => {
  const cart: {products: IProduct[]} = useSelector(selectCart)

  const total = cart.products?.reduce((accumulator, currentProduct) => {
    return accumulator + (currentProduct.quantity[0].quantity * Number(currentProduct.price));
  }, 0);

  return (
    <div 
    className="fixed bottom-0 left-0 right-0 z-20 pt-4 pb-14 px-6 bg-white"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base text-[#1A1A1C]">До оплати</span>
          <span className="text-xl text-[#1A1A1C]">{total} {' грн'}</span>
        </div>
        <Link href='/order' className="block bg-blue text-white py-3 w-full text-base font-semibold text-center rounded-xl hover:bg-active_blue transition-all">
          Оформити замовлення
        </Link>
      </div>
    </div>
  )
}

export default CartFooter
