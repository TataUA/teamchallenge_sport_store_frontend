import React, { useState } from "react";
import { cn } from "@/services/utils/cn";

// components
import SortingItems from "./SortingItems";

// helpers
import getSortingIconSVG18 from "@/helpers/getSortingIconSVG18";
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

// typess
import { IFilters } from "@/app/products/[...sub_category]/page";

export interface ISortingFilterXLProps {
  searchParams: IFilters;
}

const SortingFilterXL = (props: ISortingFilterXLProps) => {
  const { searchParams } = props;

  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);
  const classItemFilter =
    "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 pr-3";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium ";

  const classItemFilterIcon = " p-1 cursor-pointer ";

  let sortedString = "Рекомендовані";
  if (searchParams.sortedBy === "ascent") {
    sortedString = "Від меншої до більшої ціни";
  } else if (searchParams.sortedBy === "descent") {
    sortedString = "Від більшої до меншої ціни";
  }

  return (
    <>
      <li className={cn(classItemFilter)}>
        <div className="flex justify-between">
          <div className="pr-3 flex justify-center items-center">
            {getSortingIconSVG18()}
          </div>
          <div className={classItemFilterText}>{sortedString}</div>
        </div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ml-14": isSortingArrowUp,
          })}
          onClick={() => setIsSortingArrowUp(!isSortingArrowUp)}
        >
          {getArrowDownSVG()}
        </div>
        {isSortingArrowUp ? <SortingItems /> : null}
      </li>
    </>
  );
};

export default SortingFilterXL;
