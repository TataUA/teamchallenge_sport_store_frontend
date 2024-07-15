'use client'

import { cn } from "@/services/utils/cn";
import { useEffect, useRef, useState } from "react";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState(499);
  const [maxPrice, setMaxPrice] = useState(10999);
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateSlider = () => {
      if (rangeRef.current) {
        const range = maxPrice - 499;
        const minPosition = ((minPrice - 499) / range) * 100;
        const maxPosition = ((maxPrice - 499) / range) * 100;
        rangeRef.current.style.left = `${minPosition}%`;
        rangeRef.current.style.width = `${maxPosition - minPosition}%`;
      }
    };

    updateSlider();
  }, [minPrice, maxPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'min') {
      setMinPrice(Math.min(Number(value), maxPrice - 1));
    } else {
      setMaxPrice(Math.max(Number(value), minPrice + 1));
    }
  };

  return (
  <div className="w-full">
    <div className="relative h-5 mb-5">
        <input
          type="range"
          min="499"
          max="10999"
          value={minPrice}
          name="min"
          onChange={handleChange}
          className="absolute z-[2] translate-y-[-50%] top-[50%] left-0 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min="499"
          max="10999"
          value={maxPrice}
          name="max"
          onChange={handleChange}
          className="absolute z-[2] top-[50%] translate-y-[-50%] left-0 w-full appearance-none bg-transparent pointer-events-none"
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-[#E7E7E8]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500" ref={rangeRef}></div>
      </div>
      <div className={cn("flex w-full gap-2 [&>span]:w-[50%] [&>span]:border-b-[1px] [&>span]:border-[#868687]",
        '[&>span]:w-[50%] [&>span]:border-b-[1px] [&>span]:border-[#868687] [&>span]:pb-2'
      )}>
        <span>{minPrice}</span>
        <span>{maxPrice}</span>
      </div>
  </div>)
}

export default PriceFilter
