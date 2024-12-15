"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducers
import { setPrice } from "@/redux/generalFilters/generalFiltersSlice";

// selectors
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// helpers
import { cn } from "@/services/utils/cn";

const PriceFilterXL = () => {
  const dispatch = useDispatch();
  const { price } = useSelector(selectGeneralFilters);

  const [minPrice, setMinPrice] = useState(price.priceFrom);
  const [maxPrice, setMaxPrice] = useState(price.priceTo);
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "min") {
      setMinPrice(Math.min(Number(value), maxPrice - 1));
    } else {
      setMaxPrice(Math.max(Number(value), minPrice + 1));
    }

    if (rangeRef.current) {
      const range = 100 / (10999 - 499);
      rangeRef.current.style.left = `${Math.floor((minPrice - 499) * range + 2)}%`;
      rangeRef.current.style.width = `${Math.floor((maxPrice - minPrice) * range - 2)}%`;
    }
  };

  useEffect(() => {
    let timer;
    if (!timer) {
      timer = setTimeout(() => {
        const updateSlider = () => {
          if (rangeRef.current) {
            dispatch(setPrice({ priceTo: maxPrice, priceFrom: minPrice }));
          }
        };
        updateSlider();
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [minPrice, maxPrice, dispatch]);

  // make price defaults after clicked button 'Скинути Фільтри'
  useEffect(() => {
    if (price.priceFrom === 499) {
      setMinPrice(price.priceFrom);
    }
    if (price.priceTo === 10999) {
      setMaxPrice(price.priceTo);
    }
  }, [price]);

  return (
    <div className="w-full xl:px-4 xl:pt-4 ">
      <div className="relative h-4 mb-4 min-[2800px]:h-12">
        <input
          type="range"
          min="499"
          max="10999"
          value={minPrice}
          name="min"
          onChange={handleChange}
          className="absolute z-20 translate-y-[-50%] top-[50%] left-0 w-full appearance-none  bg-transparent pointer-events-none "
        />
        <input
          type="range"
          min="499"
          max="10999"
          value={maxPrice}
          name="max"
          onChange={handleChange}
          className="absolute z-20 top-[50%] translate-y-[-50%] left-0 w-full appearance-none  bg-transparent pointer-events-none "
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#CFCFCF] "></div>
        <div
          className="absolute z-10 top-1/2 h-[2px] bg-blue "
          ref={rangeRef}
        ></div>
      </div>
      <div
        className={cn(
          "flex w-full gap-2 [&>input]:w-[50%] [&>input]:border-b-[1px] [&>input]:border-[rgb(134,134,135)]",
          "[&>input]:w-[50%] [&>input]:border-b-[1px] [&>input]:border-[#868687] [&>input]:pb-2",
          "min-[2800px]:[&>input]:text-3xl",
        )}
      >
        <input
          min="499"
          max="10999"
          value={minPrice}
          name="min"
          onChange={handleChange}
          className="focus:outline-none text-[#272728] mt-4 "
        />
        <input
          min="499"
          max="10999"
          value={maxPrice}
          name="max"
          onChange={handleChange}
          className="focus:outline-none text-[#272728] mt-4"
        />
      </div>
    </div>
  );
};

export default PriceFilterXL;
