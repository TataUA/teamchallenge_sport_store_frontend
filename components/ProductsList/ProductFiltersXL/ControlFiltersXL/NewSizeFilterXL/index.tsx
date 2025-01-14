import React, { useEffect, useState } from "react";
import { cn } from "@/services/utils/cn";
// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

// hooks
import { generalProductsFilers } from "../../../ProductsFilters/filtersData";

//components
import SizeFilterXL from "../SizeFilterXL/index";
// types
import { IProduct } from "@/services/types";

interface ControlFiltrItem {
  title?: string | React.ReactNode;
  params: { sub_category: string[] };
  products: IProduct[];
  isChosenFilter: string;
  setIsChosenFilter: (id: string) => void;
}

const NewSizeFilterXL = (props: ControlFiltrItem) => {
  const { title, params, products, isChosenFilter, setIsChosenFilter } = props;

  const classItemFilter = {
    classFilter:
      " h-12 xl:h-14 md:w-[180px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText =
    "inline-block text-sm xl:text-base leading-5 font-medium lg:text-ellipsis lg:overflow-hidden whitespace-nowrap lg:w-[110px]";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classWithProps =
    "absolute z-10 bg-white border border-border_button  rounded-xl pt-3 lg:top-[58px] xl:top-[64px] left-0 w-auto h-auto";

  const handleClick = () => {
    if (isChosenFilter == "" || isChosenFilter != "size") {
      setIsChosenFilter("size");
    } else {
      setIsChosenFilter("");
    }
  };

  return (
    <div className=" relative">
      <li
        className={cn(classItemFilter.classFilter, {
          "border-blue": isChosenFilter == "size",
        })}
        onClick={handleClick}
      >
        <div className={classItemFilterText}>{title}</div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ": isChosenFilter == "size",
          })}
        >
          {getArrowDownSVG()}
        </div>
      </li>
      {isChosenFilter == "size" ? (
        <div
          className={classWithProps}
          style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
        >
          {generalProductsFilers.map((generalFilter, index) => (
            <div className="mb-2 " key={index}>
              {generalFilter.id === "sizes" &&
              generalFilter.shoesPosibleProductTypes?.includes(
                params.sub_category[0],
              ) ? (
                <div className="px-4 pt-0">
                  <SizeFilterXL
                    products={products}
                    shoesSizes={generalFilter.sizesShoes}
                  />
                </div>
              ) : null}
              {generalFilter.id === "sizes" &&
              !generalFilter.shoesPosibleProductTypes?.includes(
                params.sub_category[0],
              ) ? (
                <div className="w-auto px-4">
                  <SizeFilterXL
                    products={products}
                    clothesSizes={generalFilter.sizesClothes}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewSizeFilterXL;
