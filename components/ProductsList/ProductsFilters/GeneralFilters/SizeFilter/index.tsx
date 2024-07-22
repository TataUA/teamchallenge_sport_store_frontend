'use client'

import { useDispatch, useSelector } from "react-redux";

// utils
import { cn } from "@/services/utils/cn"

// store
import { removeSize, setSize } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// types
import { IProduct } from "@/services/types";

interface IProps {
  clothesSizes?: string[]
  shoesSizes?: string[]
  products: IProduct[]
}

const SizeFilter = (props: IProps) => {

  const dispatch = useDispatch()
  const {sizes, color} = useSelector(selectGeneralFilters);
  
  const checkIsSizeExists = (size: string | number) => {
    const filteredProducts = props.products.filter(product => {
      return product.quantity.some((productQuantity) => 
        (
          (productQuantity.size.toString().toLowerCase() === size.toString().toLowerCase())
        && (color ? (productQuantity.color.toString().toLowerCase() === color?.toLowerCase())
            : true)
      ))
    })
    return (filteredProducts?.length ? true : null)
  }

  const handleClick = (size: string) => {
    if(sizes.includes(size)) {
      dispatch(removeSize(size))
      return
    }
    dispatch(setSize(size))
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap min-[2800px]:gap-5">
        {props.clothesSizes?.map((size, sizeIndex) => (
          <li 
            onClick={() => handleClick(size)}
            className={cn('list-none size-12 rounded-lg border-[1px] p-4 flex justify-center items-center cursor-pointer',
              'hover:bg-blue hover:text-white',
              'min-[2800px]:size-20 min-[2800px]:text-3xl', {
                'border-[#0A4CF6] text-[#0A4CF6]': sizes.includes(size),
                'pointer-events-none opacity-[50%]': !checkIsSizeExists(size)
              }
            )}
            key={sizeIndex}
          >{size}</li>
        ))}
        {props.shoesSizes?.map((size, sizeIndex) => (
          <li 
            onClick={() => handleClick(size)}
            className={cn('list-none size-12 rounded-lg border-[1px] p-4 flex justify-center items-center cursor-pointer',
              'hover:bg-blue hover:text-white',
              'min-[2800px]:size-20 min-[2800px]:text-3xl', {
                'border-[#0A4CF6] text-[#0A4CF6]': sizes.includes(size),
                'pointer-events-none opacity-[50%]': !checkIsSizeExists(size)
              }
            )}
            key={sizeIndex}
          >{size}</li>
        ))}
      </div>
    </>
  )
}

export default SizeFilter
