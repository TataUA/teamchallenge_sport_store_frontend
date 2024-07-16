'use client'

import { cn } from "@/services/utils/cn"
import { useDispatch, useSelector } from "react-redux";

import { removeClothesSize, removeShoesSize, setClothesSize, setShoesSize } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

interface IProps {
  clothesSizes?: string[]
  shoesSizes?: string[]
}

const SizeFilter = (props: IProps) => {
  const dispatch = useDispatch()
  const {shoesSizes, clothesSizes} = useSelector(selectGeneralFilters);

  const handleClickClothes = (size: string) => {
    if(clothesSizes.includes(size)) {
      dispatch(removeClothesSize(size))
      return
    }
    dispatch(setClothesSize(size))
  }
  const handleShoesClothes = (size: string) => {
    if(shoesSizes.includes(size)) {
      dispatch(removeShoesSize(size))
      return
    }
    dispatch(setShoesSize(size))
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {props.clothesSizes?.map((size, sizeIndex) => (
          <li 
            onClick={() => handleClickClothes(size)}
            className={cn('list-none size-12 rounded-lg border-[1px] p-4 flex justify-center items-center cursor-pointer',
              'hover:bg-blue hover:text-white', {
                'border-[#0A4CF6] text-[#0A4CF6]': clothesSizes.includes(size)
              }
            )}
            key={sizeIndex}
          >{size}</li>
        ))}
        {props.shoesSizes?.map((size, sizeIndex) => (
          <li 
            onClick={() => handleShoesClothes(size)}
            className={cn('list-none size-12 rounded-lg border-[1px] p-4 flex justify-center items-center cursor-pointer',
              'hover:bg-blue hover:text-white', {
                'border-[#0A4CF6] text-[#0A4CF6]': shoesSizes.includes(size)
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
