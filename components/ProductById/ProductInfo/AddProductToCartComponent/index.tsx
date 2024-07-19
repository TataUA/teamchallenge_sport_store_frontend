'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { useRouter } from "next/navigation"

// components
import ResponsiveModal from "@/components/shared/ResponsiveModal"

// helpers
import getCartSVG from "@/helpers/getCartSVG"
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG"
import { cn } from "@/services/utils/cn"

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector"
import { setIsSizeModalOpened } from "@/redux/currentProduct/currentProductSlice"
import { setProduct } from "@/redux/cart/cartSlice"

// types
import { IProduct } from "@/services/types"

const AddProductToCartComponent = ({product}: {product: IProduct}) => {
  const [isSuccessModalIsOpened, setIsSuccessModalIsOpened] = useState(false)
  
  const dispatch = useDispatch()
  const router = useRouter()

  const currentProduct = useSelector(selectCurrentProduct)
  const {sizes: sizesStored} = currentProduct

  const handleClickCartButton = () => {
      if(!sizesStored?.length) {
        dispatch(setIsSizeModalOpened(true))
        return
      }
      setIsSuccessModalIsOpened(true)
      dispatch(setProduct(product))
    }

    useEffect(()=>{
      console.log("🚀 ~ AddProductToCartComponent ~ product:", product)
    },[product])

  return (
    <div>
      <div 
        className={cn("bg-blue mb-8 w-full text-white py-4 px-10 fill-white cursor-pointer flex justify-center items-center gap-2 rounded-xl",
            '[&>svg]:text-white',
            'hover:opacity-[75%]',
            'lg:max-w-[500px] 2xl:3xl',
          )}
        onClick={() => handleClickCartButton()}
      >
            {getCartSVG()}
            Додати до кошика
      </div>
      <ResponsiveModal isOpen={isSuccessModalIsOpened} onClose={() => setIsSuccessModalIsOpened(false)}>
          <div className="flex gap-3 justify-center items-center mb-10">
            <span className="bg-blue rounded-[50%] [&>svg]:fill-white [&>svg]:text-white">{getCheckedIconSVG()}</span>
            <h3 className="text-xl text-[#272728]">Товар додано в кошик!</h3>
          </div>
          <div className="flex gap-3 mb-8">
            <div className={cn("w-[108px] h-[108px] bg-blue rounded-xl overflow-hidden")}>
              <Image 
                width={108} 
                height={108} 
                src={product.images[0].image_url} 
                alt='photo_product'
              />
            </div>
            <div className="flex flex-col justify-evenly flex-1">
              <p>{product.title}</p>
              <div className="flex justify-between">
                <span className="text-[#868687] text-sm">Розмір: {sizesStored.join(' UA, ')}</span>
                <span className="text-[#1A1A1C] font-semibold text-base">{product.price} грн</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div 
              onClick={(() => setIsSuccessModalIsOpened(false))}
            className={cn("text-[#0A4CF6] rounded-xl border-[1px] border-[#0A4CF6] py-4 px-20 mb-3",
              'hover:text-white hover:bg-[#0A4CF6] cursor-pointer'
            )}
            >
              Продовжити покупки
            </div>
            <div 
              onClick={() => router.push('/cart')}
              className={cn("text-white bg-[#0A4CF6] rounded-xl py-4 px-20 mb-3",
                'hover:text-[#0A4CF6] hover:bg-white hover:border-[#0A4CF6] border-[1px] cursor-pointer'
              )}
            >
              Перейти в кошик</div>
            </div>
      </ResponsiveModal>
    </div>
  )
}

export default AddProductToCartComponent
