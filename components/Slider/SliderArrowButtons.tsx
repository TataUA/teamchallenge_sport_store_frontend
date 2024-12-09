"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSwiper } from "swiper/react";

import { cn } from "@/services/utils/cn";
import arrowLeft from "@/public/icons/slider-arrow-left.svg";
import arrowRight from "@/public/icons/slider-arrow-right.svg";

export function SliderButtons() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const updateState = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on("slideChange", updateState);
    swiper.on("reachBeginning", updateState);
    swiper.on("reachEnd", updateState);

    updateState();

    return () => {
      swiper.off("slideChange", updateState);
      swiper.off("reachBeginning", updateState);
      swiper.off("reachEnd", updateState);
    };
  }, [swiper]);

  return (
    <div
      className={cn(
        "absolute w-[528px] hidden 1440:flex align-middle justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        {
          "justify-end": isBeginning,
        },
      )}
    >
      <button
        onClick={() => swiper.slidePrev()}
        aria-label="Previous slide"
        className={cn({ hidden: isBeginning })}
      >
        <Image src={arrowLeft} alt="Стрілка попередній слайд" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        aria-label="Next slide"
        className={cn({ hidden: isEnd })}
      >
        <Image src={arrowRight} alt="Стрілка наступний слайд" />
      </button>
    </div>
  );
}
