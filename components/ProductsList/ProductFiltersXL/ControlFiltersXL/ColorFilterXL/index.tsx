"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
// helpers

import { cn } from "@/services/utils/cn";

// redux
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";
import { setColor } from "@/redux/generalFilters/generalFiltersSlice";

//helpers
import getSelectedFilterIconSVG20 from "@/helpers/getSelectedFilterIconSVG20";

interface IProps {
  colors: { title: string; value: string }[];
}

const ColorsFilterXL = (props: IProps) => {
  const dispatch = useDispatch();
  const { color: colorStored } = useSelector(selectGeneralFilters);

  const handleClickColor = (color: string) => {
    if (color === colorStored) {
      dispatch(setColor(""));
    } else {
      dispatch(setColor(color));
    }
  };

  return (
    <ul className="list-none">
      {props.colors.map((colorItem, index) => (
        <li onClick={() => handleClickColor(colorItem.value)} key={index}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "flex min-h-12 list-none items-center gap-3 text-[#272728] cursor-pointer min-[2800px]:gap-5 min-[2800px]:mb-5",
                  "[&>svg]:hidden [&>svg]:fill-blue xl:mt-1",
                  {
                    " [&>svg]:block [&>svg]:ml-auto [&>svg]:size-7 min-[2800px]:[&>svg]:size-12":
                      colorStored === colorItem.value,
                  },
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-[50%]",
                    `bg-${colorItem.value.toLocaleLowerCase()}`,
                    "min-[2800px]:size-16",
                    {
                      "border-[1px] xl:border-timer":
                        colorItem.value.toLocaleLowerCase() === "white",
                      "bg-colorful-circle bg-center bg-cover":
                        colorItem.value.toLocaleLowerCase() === "colorful",
                    },
                  )}
                />
              </div>

              <div
                className={cn(
                  " ml-4 pt-2 text-sm  xl:text-base xl:tracking-wider font-medium min-[2800px]:text-3xl",
                )}
              >
                {colorItem.title}
              </div>
            </div>

            {colorStored === colorItem.value ? (
              <div className="items-end  mt-[2px] mr-2  ">
                {getSelectedFilterIconSVG20()}
              </div>
            ) : (
              <div className=" items-end w-[20px] h-[20px] mr-2 bg-white  border-border border-2 rounded-md"></div>
            )}
          </div>
          {index < 3 ? <div className=" mt-1 h-[1px] bg-border  "></div> : null}
        </li>
      ))}
    </ul>
  );
};

export default ColorsFilterXL;
