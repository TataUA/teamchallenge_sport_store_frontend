"use client";

import { useSelector } from "react-redux";

// components
import { Slider } from "@/components/Slider-hero/Slider";

// helpers
import { getArrayWithExtractedImgUrlWithCurrentColor } from "@/helpers/getArrayWithExtractedImgUrl";

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";

const SliderComponent = () => {
  const { product, color } = useSelector(selectCurrentProduct);

  const getImagesData = () => {
    if (product) {
      return getArrayWithExtractedImgUrlWithCurrentColor(product, color);
    }
    return [];
  };

  return (
    <div className="rounded-[12px] overflow-hidden mb-4 1440:max-w-[528px]">
      <Slider productsList autoPlay={false} cardImage data={getImagesData()} />
    </div>
  );
};

export default SliderComponent;
