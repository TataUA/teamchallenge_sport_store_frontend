import React, { useState } from "react";
import { cn } from "@/services/utils/cn";
// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";
import { generalProductsFilers } from "../../../ProductsFilters/filtersData";

//components
import SizeFilterXL from "../SizeFilterXL";
// types
import { IProduct } from "@/services/types";

interface ControlFiltrItem {
  title?: string | React.ReactNode;
  params: { sub_category: string[] };
  products: IProduct[];
}

const NewSizeFilterXL = (props: ControlFiltrItem) => {
  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);

  const classItemFilter = {
    classFilter:
      "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText = "inline-block text-base leading-5 font-medium";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classWithProps =
    "absolute z-10 bg-white border border-border_button  rounded-xl pt-3 top-[64px] left-0 w-auto h-auto";

  return (
    <div className=" relative">
      <li
        className={cn(classItemFilter.classFilter, {
          "border-blue": isSortingArrowUp,
        })}
        onClick={() => setIsSortingArrowUp(!isSortingArrowUp)}
      >
        <div className={classItemFilterText}>{props.title}</div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ": isSortingArrowUp,
          })}
        >
          {getArrowDownSVG()}
        </div>
      </li>
      {isSortingArrowUp ? (
        <div
          className={classWithProps}
          style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
        >
          {generalProductsFilers.map((generalFilter, index) => (
            <div className="mb-2 min-[2800px]:mb-20" key={index}>
              {generalFilter.id === "sizes" &&
              generalFilter.shoesPosibleProductTypes?.includes(
                props.params.sub_category[0],
              ) ? (
                <div className="px-4 pt-0">
                  <SizeFilterXL
                    products={props.products}
                    shoesSizes={generalFilter.sizesShoes}
                  />
                </div>
              ) : null}
              {generalFilter.id === "sizes" &&
              !generalFilter.shoesPosibleProductTypes?.includes(
                props.params.sub_category[0],
              ) ? (
                <div className="w-auto px-4">
                  <SizeFilterXL
                    products={props.products}
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
