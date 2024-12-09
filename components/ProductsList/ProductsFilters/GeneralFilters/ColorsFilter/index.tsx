"use client";

import { useDispatch, useSelector } from "react-redux";

// helpers
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn";

// redux
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";
import { setColor } from "@/redux/generalFilters/generalFiltersSlice";

interface IProps {
  colors: { title: string; value: string }[];
}

const ColorsFilter = (props: IProps) => {
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
        <li
          className={cn(
            "flex min-h-12 list-none items-center gap-3 text-[#272728] cursor-pointer min-[2800px]:gap-5 min-[2800px]:mb-5",
            "[&>svg]:hidden [&>svg]:fill-blue",
            {
              "text-[#083DC5] [&>svg]:block [&>svg]:ml-auto [&>svg]:size-7 min-[2800px]:[&>svg]:size-12":
                colorStored === colorItem.value,
            },
          )}
          onClick={() => handleClickColor(colorItem.value)}
          key={index}
        >
          <span
            className={cn(
              "size-8 rounded-[50%]",
              `bg-${colorItem.value.toLocaleLowerCase()}`,
              "min-[2800px]:size-16",
              {
                "border-[1px]": colorItem.value.toLocaleLowerCase() === "white",
                "bg-colorful-circle bg-center bg-cover":
                  colorItem.value.toLocaleLowerCase() === "colorful",
              },
            )}
          />
          <span
            className={cn(
              " text-sm  xl:text-base xl:tracking-wider font-medium min-[2800px]:text-3xl",
            )}
          >
            {colorItem.title}
          </span>
          {getCheckedIconSVG()}
        </li>
      ))}
    </ul>
  );
};

export default ColorsFilter;
