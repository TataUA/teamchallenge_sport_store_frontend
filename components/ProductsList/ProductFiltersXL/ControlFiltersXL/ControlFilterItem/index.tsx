import React, { useState } from "react";
import { cn } from "@/services/utils/cn";
// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

interface ControlFiltrItem {
  children: React.ReactNode;
  title?: string;
  width: string;
  hight: string;
}

const ControlPrice = (props: ControlFiltrItem) => {
  const [isSortingArrowUp, setIsSortingArrowUp] = useState(false);

  const classItemFilter =
    "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium";
  const classItemFilterIcon = "ml-2 mr-3  p-1 cursor-pointer ";

  const classBlockChosen = {
    type1:
      "absolute z-10 bg-white border border-border rounded-xl  top-[60px] left-0",
  };

  const classWithProps = cn(classBlockChosen.type1, props.width, props.hight);

  return (
    <div className=" relative">
      <li className={classItemFilter}>
        <div className={classItemFilterText}>{props.title}</div>
        <div
          className={cn(classItemFilterIcon, {
            "rotate-180 ": isSortingArrowUp,
          })}
          onClick={() => setIsSortingArrowUp(!isSortingArrowUp)}
        >
          {getArrowDownSVG()}
        </div>
      </li>
      {isSortingArrowUp ? (
        <div className={classWithProps}>
          <h3 className="text-base font-semibold text-[#272728] py-2 px-2 mb-2 min-[2800px]:text-4xl min-[2800px]:mb-10">
            {/* Ціна */}
          </h3>
          {props.children}
        </div>
      ) : null}
    </div>
  );
};

export default ControlPrice;
