import React, { useState } from "react";
import { cn } from "@/services/utils/cn";

// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

import PriceFilterXL from "../PriceFilterXL/index";

interface ControlFiltrItem {
  title?: string | React.ReactNode;
  isChosenFilter: string;
  setIsChosenFilter: (id: string) => void;
}

const NewPriceFilterXL = (props: ControlFiltrItem) => {
  const { title, isChosenFilter, setIsChosenFilter } = props;

  const classItemFilter = {
    classFilter:
      "h-12 xl:h-14 md:w-[180px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText =
    "inline-block text-sm xl:text-base leading-5 font-medium";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classWithProps =
    "absolute z-10 bg-white border border-border_button  rounded-xl pt-3 top-[58px] xl:top-[64px] left-[-240px] xl:left-0 lg:w-[429px] xl:w-[436px] h-[140px]";

  const handleClick = () => {
    if (isChosenFilter == "" || isChosenFilter != "price") {
      setIsChosenFilter("price");
    } else {
      setIsChosenFilter("");
    }
  };

  return (
    <div className=" relative">
      <li
        className={cn(classItemFilter.classFilter, {
          "border-blue": isChosenFilter == "price",
        })}
        onClick={handleClick}
      >
        <div className={classItemFilterText}>{title}</div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ": isChosenFilter == "price",
          })}
        >
          {getArrowDownSVG()}
        </div>
      </li>
      {isChosenFilter == "price" ? (
        <div
          className={classWithProps}
          style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
        >
          <PriceFilterXL />
        </div>
      ) : null}
    </div>
  );
};

export default NewPriceFilterXL;
