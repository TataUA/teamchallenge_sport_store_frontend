"use client";

import Image from "next/image";
import { useSwiper } from "swiper/react";
import arrowLeft from "@/public/icons/arrow_left.svg";
import arrowRight from "@/public/icons/arrow_right.svg";

export function SliderButtons() {
  const swiper = useSwiper();

  return (
    <div className="absolute bottom-3 right-36 w-18 z-10 flex justify-between">
      <button onClick={() => swiper.slidePrev()}>
        <Image src={arrowLeft} alt="Prev slide button" className="w-6 h-6" />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <Image src={arrowRight} alt="Next slide button" className="w-6 h-6" />
      </button>
    </div>
  );
}
