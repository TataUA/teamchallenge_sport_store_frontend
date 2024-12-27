import React, { useState } from "react";
import { cn } from "@/services/utils/cn";

//hooks
import { generalProductsFilers } from "../../../ProductsFilters/filtersData";

// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";
// types
import { IProduct } from "@/services/types";
//components
import ColorsFilterXL from "../ColorFilterXL";
import { headerNav } from "@/constants";

interface ControlFiltrItem {
  title?: string | React.ReactNode;
  isChosenFilter: string;
  setIsChosenFilter: (id: string) => void;
}

const NewColorFilterXL = (props: ControlFiltrItem) => {
  const { title, isChosenFilter, setIsChosenFilter } = props;

  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);

  const classItemFilter = {
    classFilter:
      "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText = "inline-block text-base leading-5 font-medium";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classWithProps =
    "absolute z-10 bg-white border border-border_button  rounded-xl pt-3 top-[64px] left-0 w-[252px] h-auto";

  const handleClick = () => {
    setIsSortingArrowUp(!isSortingArrowUp);
    if (isSortingArrowUp == true) {
      setIsChosenFilter("color");
    } else {
      setIsChosenFilter("");
    }
  };

  return (
    <div className=" relative">
      <li
        className={cn(classItemFilter.classFilter, {
          "border-blue": isChosenFilter == "color",
        })}
        onClick={handleClick}
      >
        <div className={classItemFilterText}>{title}</div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ": isChosenFilter == "color",
          })}
        >
          {getArrowDownSVG()}
        </div>
      </li>
      {isChosenFilter == "color" ? (
        <div
          className={classWithProps}
          style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
        >
          {generalProductsFilers.map((generalFilter, index) => (
            <div className="mb-2 min-[2800px]:mb-20" key={index}>
              {generalFilter.id === "color" && generalFilter.colorValues ? (
                <div className="px-4 ">
                  <ColorsFilterXL colors={generalFilter.colorValues} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewColorFilterXL;
