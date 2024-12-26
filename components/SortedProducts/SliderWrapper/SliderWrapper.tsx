"use client";

import { useState, useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { IProduct } from "@/services/types";
import { Slider } from "@/components/Slider/Slider";

export const SliderWrapper = ({ products }: { products: IProduct[] }) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(2.5);
  const isMobile = useIsMobile();
  const spaceBetween = isMobile ? 8 : 24;

  useEffect(() => {
    const updateSlidesPerView = () => {
      const containerWidth = window.innerWidth;

      if (containerWidth < 480) {
        setSlidesPerView(2.5);
      } else if (containerWidth >= 480 && containerWidth < 768) {
        setSlidesPerView(3.2);
      } else if (containerWidth >= 768 && containerWidth < 1024) {
        setSlidesPerView(4.2);
      } else if (containerWidth >= 1024 && containerWidth < 1280) {
        setSlidesPerView(4.8);
      } else if (containerWidth >= 1280 && containerWidth < 1440) {
        setSlidesPerView(5);
      } else {
        setSlidesPerView(6);
      }
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
