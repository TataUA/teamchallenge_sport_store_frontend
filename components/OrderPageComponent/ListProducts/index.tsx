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

const ListProducts = () => {
  const cart = useSelector(selectCart)

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
    <div className="flex flex-col gap-4">
      <div 
      className={cn("flex justify-between items-center", {
        '[&>svg]:rotate-180': isOpened
      })} 
      onClick={() => setIsOpened(!isOpened)}
      >
        <h3
          className="text-[#1A1A1C] text-xl font-semibold"
        >
          Замовлення
        </h3>
        {getArrowDownSVG()}
      </div>
      {isOpened ? (
        <div>
          <ul className='overflow-auto'>
            {cart.products.map((product, index) => (
              <li key={product.id}>
                <div className='flex gap-3 mb-4'>
                  <div
                    className={cn(
                      'w-[50px] h-[76px] bg-blue rounded-xl overflow-hidden shrink-0'
                    )}
                  >
                    <Image
                      width={50}
                      height={76}
                      src={product.colors?.[0]?.image_url}
                      alt='photo_product'
                    />
                  </div>
                  <div className='flex flex-col justify-evenly flex-1 shrink'>
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden">{product.title}</span>
                    <div className='flex gap-2 flex-wrap'>
                      <span className='text-[#868687] text-sm'>
                        Розмір: {isShoesSizes(product.size[0].value) ? `${product.size[0].value} UA` : product.size[0].value}
                      </span>
                      <span className='text-[#868687] text-sm'>
                        Кількість: {product.quantity[0].quantity}
                      </span>
                      <span className='text-[#868687] text-sm flex-[100%]'>
                        Ціна: {product.price} грн
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col shrink-0'>
                    <span className='text-[#1A1A1C] font-semibold text-base'>
                      {Number(product.price) * Number(product.quantity[0].quantity)} грн
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center my-4 mt-8">
            <Link
              className={cn("w-full py-[11px] px-6 text-[#3E3E40] border-[1px] border-[#E7E7E8] rounded-xl text-center text-base font-semibold transition-all",
                'hover:text-white hover:bg-blue'
              )}
              href='/cart'
            >
              Змінити замовлення
            </Link>
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-[#1A1A1C]">До оплати</span>
        <span className="text-xl font-semibold text-[#1A1A1C]">{total} {' грн'}</span>
      </div>
    </div>
  )
}

export default ListProducts
