import React, { useState } from "react";
import { cn } from "@/services/utils/cn";

// components
import SortingItems from "./SortingItems";

// helpers
import getSortingIconSVG24 from "@/helpers/getSortingIcon24";
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

// typess
import { IFilters } from "@/app/products/[...sub_category]/page";

export interface ISortingFilterXLProps {
  searchParams: IFilters;
  setChosenSorting: (id: string) => void;
  chosenSorting: string;
  isChosenFilter: string;
  setIsChosenFilter: (id: string) => void;
}

const SortingFilterXL = (props: ISortingFilterXLProps) => {
  const {
    searchParams,
    setChosenSorting,
    chosenSorting,
    isChosenFilter,
    setIsChosenFilter,
  } = props;

  const [isSortingSrting, setIsSortingString] = useState("Рекомендовані");
  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);

  const classItemFilter =
    "h-14  md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 pr-3";
  const classItemFilterText =
    "inline-block text-base leading-5 font-medium w-[160px]";

  const classItemFilterIcon = " p-1 cursor-pointer  ";

  const handleClick = () => {
    setIsSortingArrowUp(!isSortingArrowUp);
    if (isSortingArrowUp == true) {
      setIsChosenFilter("select");
    } else {
      setIsChosenFilter("");
    }
  };

  return (
    <>
      <li
        className={cn(classItemFilter, {
          "border-blue": isChosenFilter == "select",
        })}
      >
        <div className="flex justify-between pr-3" onClick={handleClick}>
          <div className="flex justify-center items-center ">
            <div className="pr-3">{getSortingIconSVG24()}</div>
            <div className={classItemFilterText}>{isSortingSrting}</div>
          </div>
          <div
            className={cn(classItemFilterIcon, {
              "rotate-180 ": isChosenFilter == "select",
            })}
          >
            {getArrowDownSVG()}
          </div>
        </div>

        {isChosenFilter == "select" ? (
          <SortingItems
            setChosenSorting={setChosenSorting}
            chosenSorting={chosenSorting}
            setIsSortingString={setIsSortingString}
            setIsSortingArrowUp={setIsSortingArrowUp}
          />
        ) : null}
      </li>
    </>
  );
};

export default SortingFilterXL;
