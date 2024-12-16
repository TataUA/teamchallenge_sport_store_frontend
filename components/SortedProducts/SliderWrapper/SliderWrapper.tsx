"use client";

import { useState, useEffect } from "react";

import { IProduct } from "@/services/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Slider } from "@/components/Slider/Slider";

export const SliderWrapper = ({ products }: { products: IProduct[] }) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  const isMobile = useIsMobile();
  const spaceBetween = isMobile ? 8 : 24;

  useEffect(() => {
    const updateSlidesPerView = () => {
      const containerWidth = window.innerWidth;
      const slideWidth = isMobile ? 167 : 200;

      const slides =
        (containerWidth + spaceBetween) / (slideWidth + spaceBetween);
      setSlidesPerView(Math.min(slides, 6));
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={isMobile ? "w-[calc(100%+24px)]" : "w-full"}>
        <Slider
          products={products}
          autoPlay={false}
          loop={false}
          bestSales
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          cssMode={true}
        />
      </div>
    </>
  );
};
