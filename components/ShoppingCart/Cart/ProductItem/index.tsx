import Image from "next/image"

import { IProduct } from "@/services/types"
import { IProductWithMaxQuantity } from "@/redux/cart/cartSlice"

import ButtonSvg from "@/components/Button/ButtonSvg"

interface IProps {
  product: IProductWithMaxQuantity
  handleRemoveProduct: ({id, color, size}: {id: number, color:string, size: string}) => void
  handleIncreaseOrDecreasProduct: (option:string, product: IProductWithMaxQuantity) => void
}

const ProductItem = (props: IProps) => {
  const {
    product, 
    handleRemoveProduct,
    handleIncreaseOrDecreasProduct
  } = props

  return (
    <div className='flex'>
      <div className='overflow-hidden relative rounded-lg min-w-[109px] h-[162px]'>
        <Image
          src={product.colors?.[0]?.image_url}
          alt={product.title}
          fill
          className='object-cover object-top'
        />
      </div>
      <div className='ml-2 py-1 w-[225px]'>
        <div className='flex items-start justify-between mb-3'>
          <h3 className='text-primary font-medium text-basic font-pangram'>
            {product.title}
          </h3>
          <ButtonSvg
            type='button'
            nameSvg='delete'
            fill='#3E3E40'
            fillHovered='#868687'
            onClick={() => handleRemoveProduct({id: product.id, color: product.colors[0].color.title, size: product.size[0].value})}
          />
        </div>

        <p className='text-label mb-[42px]'>
          Розмір: {product.size?.[0]?.value} UA
        </p>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <ButtonSvg
            onClick={() => handleIncreaseOrDecreasProduct('dec', product)}
              type='button'
              nameSvg='minus'
              stroke='#3E3E40'
              strokeHovered='#868687'
              className='border border-[#e7e7e8] rounded-md w-8 h-8 cursor-pointer flex justify-center items-center'
            />
            <span 
              className='text-title font-medium text-basic'
            >{product.quantity[0].quantity}</span>
            <ButtonSvg
              onClick={() => handleIncreaseOrDecreasProduct('inc', product)}
              type='button'
              nameSvg='plus'
              stroke='#3E3E40'
              strokeHovered='#868687'
              className='border border-[#e7e7e8] rounded-md w-8 h-8 cursor-pointer flex justify-center items-center'
            />
          </div>

          <p className='text-title font-semibold text-button'>
            {product.price} грн
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
