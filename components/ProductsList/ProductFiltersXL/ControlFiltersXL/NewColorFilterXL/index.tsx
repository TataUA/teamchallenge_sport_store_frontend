import React, { useState, useEffect } from "react";
import { cn } from "@/services/utils/cn";

//hooks
import { generalProductsFilers } from "../../../ProductsFilters/filtersData";

// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

//components
import ColorsFilterXL from "../ColorFilterXL/index";
import { builders } from "prettier/doc.js";

interface ControlFiltrItem {
  title?: string | React.ReactNode;
  isChosenFilter: string;
  setIsChosenFilter: (id: string) => void;
}

const NewColorFilterXL = (props: ControlFiltrItem) => {
  const { title, isChosenFilter, setIsChosenFilter } = props;

  const classItemFilter = {
    classFilter:
      " h-12  xl:h-14 md:w-[180px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText =
    "inline-block  text-sm xl:text-base leading-5 font-medium ";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classWithProps =
    "absolute z-10 bg-white border border-border_button  rounded-xl pt-3  top-[58px] xl:top-[64px] left-0 w-[180px] xl:w-[252px] h-auto";

  const handleClick = () => {
    if (isChosenFilter == "" || isChosenFilter != "color") {
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
