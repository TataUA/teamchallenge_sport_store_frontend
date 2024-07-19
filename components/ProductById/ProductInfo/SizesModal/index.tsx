'use client'

import { useDispatch, useSelector } from "react-redux"

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector"
import { removeCurrentProductSize, setCurrentProductSize, setIsSizeModalOpened } from "@/redux/currentProduct/currentProductSlice"

// components
import ResponsiveModal from "@/components/shared/ResponsiveModal"
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData"

// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG"
import { cn } from "@/services/utils/cn"
import getMessageIconSVG from "@/helpers/getMessageIconSVG"

interface IProps {
  existedSizesFromDb: {id:number, value: string}[], 
  translatedSubCategory: string
}

const SizesModal = ({existedSizesFromDb, translatedSubCategory}: IProps) => {
  const dispatch = useDispatch()
  const {sizes: sizesStored, isSizeModalOpened} = useSelector(selectCurrentProduct)

  const sizesFromDbFilteredValues = existedSizesFromDb.map((item) => item.value)

  const arrayOfSizes = generalProductsFilers.filter(filter => filter.id === 'sizes')
  .map((item, index) => {
    if(item.shoesPosibleProductTypes?.includes(translatedSubCategory)) {
      return item.sizesShoes
    }
    return item.sizesClothes
  })[0];


  const handleClickSize = (size: string) => {
    if(sizesStored.includes(size)) {
      dispatch(removeCurrentProductSize(size))
      return
    }
    dispatch(setCurrentProductSize(size))
  }

  return (
    <>
      <div className="mb-8">
        <h4 className={cn("text-base text-[#272728] font-semibold mb-2s",
          'lg:text-xl 2xl:5xl 2xl:mb-6 min-[2800px]:text-5xl'
        )}>
          Розмір
        </h4>
        <div 
        className={cn("text-base border-[#868687] border-[1px] rounded-xl py-4 px-4 w-full flex items-center justify-between cursor-pointer",
          'lg:max-w-[500px]', {
            '[&>svg]:rotate-180': isSizeModalOpened
          }
        )}
        onClick={() => dispatch(setIsSizeModalOpened(true))}
        >
          <span 
          className={cn("text-[#868687]", {
            'text-[#272728]': sizesStored.length
          })}
          >
            {sizesStored.length ? (
              <>{sizesStored.join(', ')}</>
              ) : 'Вибрати Розмір'}
            </span>
          {getArrowDownSVG()}
        </div>
        <div className="flex gap-1 text-xs text-[#868687]">
          <span>Вагаєтесь який розмір обрати?</span>
          <span className="text-[#272728] cursor-pointer hover:underline">Розмірна сітка</span>
        </div>
        <ResponsiveModal isOpen={isSizeModalOpened} onClose={() => dispatch(setIsSizeModalOpened(false))}>
          <div className="flex gap-6 flex-col">
            <h3 className="text-xl text-[#272728] font-semibold text-center">Розмір</h3>
            <ul className="list-none flex flex-col">
              {arrayOfSizes?.map((size, index) => (
                <li
                  className={cn("border-b-[1px] border-[#E7E7E8] p-4 font-bold text-base", 
                    'flex justify-between', {
                      'text-blue': sizesStored.includes(size),
                      'text-[#CFCFCF]': !sizesFromDbFilteredValues.includes(size),
                      'cursor-pointer hover:text-blue': sizesFromDbFilteredValues.includes(size),
                    })}
                  onClick={() => handleClickSize(size)}
                  key={index}
                  >
                    {size}
                    {isNaN(Number(size)) ? null : (
                      <>
                        {' '}
                        {'UA'}
                      </>
                    )}
                    {sizesFromDbFilteredValues.includes(size) ? null : (
                      <span className="flex gap-2 items-center text-xs font-medium text=[#272728]">
                        {getMessageIconSVG()}
                        <span>Повідомити про наявність</span>
                      </span>
                    )}
                  </li>
              ))}
            </ul>
          </div>
        </ResponsiveModal>
      </div>
    </>
  )
}

export default SizesModal
