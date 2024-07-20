'use client'

import { cn } from "@/services/utils/cn"
import { useDispatch, useSelector } from "react-redux";

import { removeSize, setSize } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

interface IProps {
  clothesSizes?: string[]
  shoesSizes?: string[]
}

const SizeFilter = (props: IProps) => {

  const dispatch = useDispatch()
  const {sizes} = useSelector(selectGeneralFilters);
 
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
                'border-[#0A4CF6] text-[#0A4CF6]': sizes.includes(size)
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
                'border-[#0A4CF6] text-[#0A4CF6]': sizes.includes(size)
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
