// utils
import { cn } from "@/services/utils/cn"
import getArrayWithExtractedImgUrl from "@/helpers/getArrayWithExtractedImgUrl"

// components
import {Slider}  from "@/components/slider-hero/Slider"

// types
import { IProduct } from "@/services/types"

const ListItem = (props: {product: IProduct}) => {
  const {product} = props
  const {title, color, price} = product

  return (
    <div className={cn(
      'flex flex-col gap-2 pb-5',
      "w-[32.33333%] max-[767px]:w-[48.5%] max-[767px]:pb-4 max-[380px]:w-[100%] min-[1250px]:w-[24%] min-[2800px]:gap-6"
      )}>
      <div className="rounded-[12px] overflow-hidden">
        <Slider
          productsList
          autoPlay={false} 
          data={getArrayWithExtractedImgUrl(product)}
          />
      </div>
      <div 
        className="text-[#575758] truncate text-base max-[767px]:text-sm font-medium min-[2800px]:text-3xl"
      >
        {title}
      </div>
      <ul className="flex gap-2 min-[2800px]:gap-5">
        {color?.map((color)=> (
          <li 
            key={color.id}
            className={cn(
              `bg-${color.title.toLowerCase()} relative min-w-3 min-h-3 rounded-[50%] min-[2800px]:size-8`, {
                'border': true,
              })}
          />
        ))}
        <li></li>
      </ul>
      <div 
        className="text-[#1A1A1C] truncate text-xl max-[767px]:text-base font-semibold min-[2800px]:text-4xl"
      >
        {price + ' грн'}
      </div>
    </div>
  )
}

export default ListItem
