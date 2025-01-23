"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

//redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";
import {
  setCurrentProductSize,
  setIsSizeModalOpened,
} from "@/redux/currentProduct/currentProductSlice";

//services & helpers
import { cn } from "@/services/utils/cn";
import getMessageIconSVG from "@/helpers/getMessageIconSVG";

//components
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData";
import check from "@/public/icons/check-blue.svg";

interface SizeChoosingTableProps {
  existedSizesFromDb: { color: string; quantity: number; size: string }[];
  translatedSubCategory: string;
}

export const SizeChoosingTable = ({
  existedSizesFromDb,
  translatedSubCategory,
}: SizeChoosingTableProps) => {
  const dispatch = useDispatch();

  const { sizes: sizesStored, color: currentColor } =
    useSelector(selectCurrentProduct);

  const sizesFromDbFilteredValues = existedSizesFromDb
    .filter((item) => {
      return (
        item.color.toLowerCase() === currentColor?.toLowerCase() &&
        item.quantity >= 1
      );
    })
    .map((item) => item.size);

  const arrayOfSizes = generalProductsFilers
    .filter((filter) => filter.id === "sizes")
    .map((item, index) => {
      if (item.shoesPosibleProductTypes?.includes(translatedSubCategory)) {
        return item.sizesShoes;
      }
      return item.sizesClothes;
    })[0];

  const handleClickSize = (size: string) => {
    dispatch(setCurrentProductSize(size));
    dispatch(setIsSizeModalOpened(false));
  };

  return (
    <div className="flex gap-6 flex-col">
      <h3 className="md:hidden text-center font-semibold text-xl text-primary">Розмір</h3>
      <ul className="list-none flex flex-col">
        {arrayOfSizes?.map((size, index) => (
          <li
            className={cn(
              "p-4 border-b border-border_button font-bold text-base text-primary",
              "flex justify-between",
              {
                "text-blue": sizesStored === size,
                "text-border pointer-events-none":
                  !sizesFromDbFilteredValues.includes(size),
                "cursor-pointer hover:text-blue":
                  sizesFromDbFilteredValues.includes(size),
              },
            )}
            onClick={() => handleClickSize(size)}
            key={index}
          >
            {size}
            {isNaN(Number(size)) ? null : <> {"UA"}</>}
            {sizesFromDbFilteredValues.includes(size) ? null : (
              <span className="flex gap-2 items-center font-medium text-xs text-primary">
                {getMessageIconSVG()}
                <span>Повідомити про наявність</span>
              </span>
            )}
            {sizesStored === size && (
              <span className="flex gap-2 items-center font-medium text-xs text-primary">
                <Image src={check} width={28} height={28} alt="Синя галочка" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
