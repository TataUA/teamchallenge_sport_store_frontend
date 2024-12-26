import React, { useState } from "react";
import { cn } from "@/services/utils/cn";
// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

interface ControlFiltrItem {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  width: string;
  hight: string;
}

const ControlPrice = (props: ControlFiltrItem) => {
  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);

  const classItemFilter = {
    classFilter:
      "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ",
  };

  const classItemFilterText = "inline-block text-base leading-5 font-medium";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classBlockChosen = {
    type1:
      "absolute z-10 bg-white border border-border_button  rounded-xl pt-3 top-[64px] left-0",
  };

  const classWithProps = cn(classBlockChosen.type1, props.width, props.hight);

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
          {props.children}
        </div>
      ) : null}
    </div>
  );
};

export default ControlPrice;
