'use client'

import { useSelector } from "react-redux"

// components
import { Slider } from "@/components/slider-hero/Slider"

// helpers
import { getArrayWithExtractedImgUrlWithCurrentColor } from "@/helpers/getArrayWithExtractedImgUrl"

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector"

const SliderComponent = () => {
  const {product, color} = useSelector(selectCurrentProduct) 

  const getImagesData = () => {
    if(product) {
      return getArrayWithExtractedImgUrlWithCurrentColor(product, color)
    }
    return []
  }
  
  return (
    <div className="rounded-[12px] overflow-hidden mb-4">
      <Slider
        productsList
        autoPlay={false}
        data={getImagesData()}
        className={'h-[343px] min-[2800px]:h-[1000px] min-[768px]:h-[500px]'} 
        />
    </div>
  )
}

export default SliderComponent
