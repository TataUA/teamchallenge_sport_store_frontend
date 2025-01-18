"use client";

import { useState, useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PopularCategories } from "@/public/data/popular-categories.data";
import { Slider } from "@/components/Slider/Slider";

export const SliderWrapper = ({
  popular,
}: {
  popular: PopularCategories[];
}) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3.1);
  const isMobile = useIsMobile();
  const spaceBetween = isMobile ? 8 : 24;

  useEffect(() => {
    const updateSlidesPerView = () => {
      const containerWidth = window.innerWidth;

      if (containerWidth < 768) {
        setSlidesPerView(3.1);
      } else if (containerWidth >= 768 && containerWidth < 1024) {
        setSlidesPerView(3.5);
      } else {
        setSlidesPerView(4);
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
          popular={popular}
          popularCat
          autoPlay={false}
          loop={false}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
        />
      </div>
    </>
  );
};
