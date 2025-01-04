'use client'

// core
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useState } from "react"

// data
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData"

// selector
import { selectCart } from "@/redux/cart/cartSelector"

// utils
import { cn } from "@/services/utils/cn"

// assets
import getArrowDownSVG from "@/helpers/getArrowDownSVG"
import { useIsMobile } from "@/hooks/useIsMobile"

const ListProducts = () => {
  const cart = useSelector(selectCart)
  const isMobile = useIsMobile();

  const [isOpened, setIsOpened] = useState(false)

  const isShoesSizes = (size: string) => {
    const shoesSizes = generalProductsFilers.filter(
      item => item.id === 'sizes'
    )[0].sizesShoes

    return shoesSizes?.includes(size.toLowerCase())
	}

  const total = cart.products?.reduce((accumulator, currentProduct) => {
    return accumulator + (currentProduct.quantity[0].quantity * Number(currentProduct.price));
  }, 0);

  return (
    <div className="md:col-start-2 md:row-start-1 mb-[40px] md:mb-0 md:row-end-10">
      <div className="flex flex-col gap-4 bg-[#F5F5F5] p-8 rounded-3xl">
        <div
          className={cn("flex justify-between items-center", {
            "[&>svg]:rotate-180": isOpened,
          })}
          onClick={() => setIsOpened(!isOpened)}
        >
          <h3 className="text-[#1A1A1C] text-xl font-semibold">
            Замовлення
            <span>{` (${cart.products.length})`}</span>
          </h3>
          {getArrowDownSVG()}
        </div>
        {isOpened ? (
          <div>
            <ul className="overflow-auto">
              {cart.products.map((product, index) => (
                <li key={product.id}>
                  <div className="flex gap-3 mb-4">
                    <div
                      className={cn(
                        "w-[50px] h-[76px] lg:w-[100px] lg:h-[124px] bg-grey rounded-xl overflow-hidden shrink-0",
                      )}
                    >
                      <Image
                        width={isMobile ? 50 : 100}
                        height={isMobile ? 76 : 124}
                        src={product.colors?.[0]?.image_url}
                        alt="photo_product"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 shrink">
                      <div className="flex gap-4">
                        <span className="flex-1 text-ellipsis overflow-hidden text-sm">
                          {product.title}
                        </span>
                        <div className="flex flex-col shrink-0">
                          <span className="text-[#1A1A1C] font-semibold text-base">
                            {Number(product.price) *
                              Number(product.quantity[0].quantity)}{" "}
                            грн
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-[#868687] text-sm">
                          Розмір:{" "}
                          {isShoesSizes(product.size[0].value)
                            ? `${product.size[0].value} UA`
                            : product.size[0].value}
                        </span>
                        <span className="text-[#868687] text-sm">
                          Кількість: {product.quantity[0].quantity}
                        </span>
                        <span className="text-[#868687] text-sm flex-[100%]">
                          Ціна: {product.price} грн
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center my-4 mt-8">
              <Link
                className={cn(
                  "w-full py-[11px] px-6 text-[#3E3E40] border-[1px] border-[#E7E7E8] rounded-xl text-center text-base font-semibold transition-all",
                  "hover:bg-white",
                )}
                href="/cart"
              >
                Змінити замовлення
              </Link>
            </div>
          </div>
        ) : null}
        <div className="h-[1px] bg-[#E7E7E8]"></div>
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-[#1A1A1C]">
            До оплати
          </span>
          <span className="text-xl font-semibold text-[#1A1A1C]">
            {total} {" грн"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListProducts
