"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
// utils
import { cn } from "@/services/utils/cn";

// store
import {
  removeSize,
  setSize,
} from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// types
import { IProduct } from "@/services/types";

//helpers
import getSelectedFilterIconSVG20 from "@/helpers/getSelectedFilterIconSVG20";

interface IProps {
  clothesSizes?: string[];
  shoesSizes?: string[];
  products: IProduct[];
}

const SizeFilter = (props: IProps) => {
  const dispatch = useDispatch();
  const { sizes, color } = useSelector(selectGeneralFilters);

  const checkIsSizeExists = (size: string | number) => {
    const filteredProducts = props.products.filter((product) => {
      return product.quantity.some(
        (productQuantity) =>
          productQuantity.size.toString().toLowerCase() ===
            size.toString().toLowerCase() &&
          (color
            ? productQuantity.color.toString().toLowerCase() ===
              color?.toLowerCase()
            : true),
      );
    });
    return filteredProducts?.length ? true : null;
  };

  const handleClick = (size: string) => {
    if (sizes.includes(size)) {
      dispatch(removeSize(size));
      return;
    }
    dispatch(setSize(size));
  };

  return (
    <>
      <div className="flex gap-2  pt-1 mb-[-8px] flex-wrap min-[2800px]:gap-5 xl:flex-col xl:flex-nowrap ">
        {props.clothesSizes?.map((size, sizeIndex) => (
          <li
            onClick={() => handleClick(size)}
            className={cn(
              "list-none size-12 rounded-lg border-[1px] p-2 px-0 items-center cursor-pointer xl:border-0 xl: w-[218px] ",
              "min-[2800px]:size-20 min-[2800px]:text-3xl",
              {
                "pointer-events-none opacity-[50%]": !checkIsSizeExists(size),
              },
            )}
            key={sizeIndex}
          >
            <div className="flex justify-between">
              <div className="">{size}</div>
              {sizes.includes(size) ? (
                <div className="flex justify-center items-center mt-[-8px] mr-2">
                  {getSelectedFilterIconSVG20()}
                </div>
              ) : (
                <div className=" items-end w-[20px] h-[20px] mr-2 bg-white  border-border border-2 rounded-md"></div>
              )}
            </div>
            {sizeIndex + 1 == props.clothesSizes?.length ? null : (
              <div className=" mt-3 h-[1px] bg-border "></div>
            )}
          </li>
        ))}

        {props.shoesSizes?.map((size, sizeIndex) => (
          <li
            onClick={() => handleClick(size)}
            className={cn(
              "list-none size-12 rounded-lg border-[1px] p-2 px-0 items-center cursor-pointer xl:border-0 xl: w-[218px] ",
              "min-[2800px]:size-20 min-[2800px]:text-3xl",
              {
                "pointer-events-none opacity-[50%]": !checkIsSizeExists(size),
              },
            )}
            key={sizeIndex}
          >
            <div className="flex justify-between">
              <div className="">{size}</div>
              {sizes.includes(size) ? (
                <div className="flex justify-center items-center mt-[-8px] mr-2">
                  {getSelectedFilterIconSVG20()}
                </div>
              ) : (
                <div className=" items-end w-[20px] h-[20px] mr-2 bg-white  border-border border-2 rounded-md"></div>
              )}
            </div>

            {sizeIndex + 1 == props.shoesSizes?.length ? null : (
              <div className=" mt-3 h-[1px] bg-border "></div>
            )}
          </li>
        ))}
      </div>
    </>
  );
};

export default SizeFilter;
