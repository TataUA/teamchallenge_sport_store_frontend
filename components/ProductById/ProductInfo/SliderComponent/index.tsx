"use client";

import { useSelector } from "react-redux";

import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";
import { getArrayWithExtractedImgUrlWithCurrentColor } from "@/helpers/getArrayWithExtractedImgUrl";
import { Slider } from "@/components/Slider/Slider";

const SliderComponent = () => {
  const { product, color } = useSelector(selectCurrentProduct);

  const getImagesData = () => {
    if (product) {
      return getArrayWithExtractedImgUrlWithCurrentColor(product, color);
    }
    return [];
  };

  return (
    <div className="rounded-[12px] overflow-hidden mb-4">
      <Slider
        productsList
        loop={false}
        autoPlay={false}
        cardImage
        data={getImagesData()}
      />
    </div>
  );
};

export default SliderComponent;
