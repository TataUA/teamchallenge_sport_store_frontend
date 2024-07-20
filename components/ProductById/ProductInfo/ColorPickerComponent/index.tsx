'use client'

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector"
import { setCurrentProductColor } from "@/redux/currentProduct/currentProductSlice"

// types
import { IColor, IColors } from "@/services/types"

// utils
import { cn } from "@/services/utils/cn"
import getArrayRemovedColorsDuplicates from "@/helpers/getArrayRemovedDuplicates"

const ColorPickerComponent = ({colors}: {colors: IColors[]}) => {
  const dispatch = useDispatch()

  const {color: currentColor} = useSelector(selectCurrentProduct)
  const [colorsWithoutDuplicates, setColorsWithoutDuplicates] = useState<IColor[]>([])

  const currentColorLoweCase = currentColor.toLowerCase()

  
  const handleClick = (color: string) => {
    dispatch(setCurrentProductColor(color))
  }
  
  useEffect(()=>{
    setColorsWithoutDuplicates([...getArrayRemovedColorsDuplicates(colors)])

  },[colors])

  useEffect(()=>{
    if(colorsWithoutDuplicates?.length) {
      dispatch(setCurrentProductColor(colorsWithoutDuplicates[0].title.toLowerCase()))
    }

  },[dispatch, colorsWithoutDuplicates])

  return (
    <div className="mb-8 2xl:mb-16">
      <h4 className="text-base font-semibold mb-2 lg:text-xl lg:mb-4 min-[2800px]:text-5xl min-[2800px]:mb-6">
        Колір
        </h4>
      <ul className="flex gap-2 min-[2800px]:gap-5">
        {colorsWithoutDuplicates?.map((color)=> (
          <li 
            key={color.id}
            onClick={() => handleClick(color.title)}
            className={cn(
              `min-w-[50px] min-h-[50px] rounded-[50%] min-[2800px]:size-20 relative z-20 cursor-pointer`,
              'flex items-center justify-center',
              `${currentColorLoweCase === color.title.toLowerCase() ? `border-${currentColorLoweCase} border-[3px] border-opacity-900` : ''}`,
              `${'white' === color.title.toLowerCase() ? `border-gray border-[3px] border-opacity-100` : ''}`, {
              })}
          >
            <div className={cn(
              `bg-${color.title.toLowerCase()} min-w-10 min-h-10 rounded-[50%] min-[2800px]:size-18 overflow-hidden`, {
                'border-gray border-[3px] border-opacity-100': (currentColorLoweCase === color.title.toLowerCase()) 
                  && ('white' === color.title.toLowerCase()),
              })} />
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ColorPickerComponent
