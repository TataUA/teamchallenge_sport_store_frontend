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

//icon
import checkedIcon from "@/public/icons/products/filters/Checkbox.png";

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
      <div className="flex gap-2 flex-wrap min-[2800px]:gap-5 xl:flex-col xl:flex-nowrap">
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
                <div className="flex justify-center items-center mt-[-8px] mr-1">
                  <Image alt="checked" src={checkedIcon} className="w-7" />
                </div>
              ) : (
                <div className=" items-end w-[18px] h-[18px] mr-2 bg-white  border-border border-2 rounded-md"></div>
              )}
            </div>
            <div className=" mt-3 h-[1px] bg-border"></div>
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
                <div className="flex justify-center items-center mt-[-8px] mr-1">
                  <Image alt="checked" src={checkedIcon} className="w-7" />
                </div>
              ) : (
                <div className=" items-end w-[18px] h-[18px] mr-2 bg-white  border-border border-2 rounded-md"></div>
              )}
            </div>
            <div className=" mt-3 h-[1px] bg-border"></div>
          </li>
        ))}
      </div>
    </>
  );
};

export default SizeFilter;