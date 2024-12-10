"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";
import {
  setCurrentProductSize,
  setIsSizeModalOpened,
} from "@/redux/currentProduct/currentProductSlice";

// components
import ResponsiveModal from "@/components/Shared/ResponsiveModal";
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData";
import SizeGridTables from "../SizeGridTables";

// helpers
import getArrowDownSVG from "@/helpers/getArrowDownSVG";
import { cn } from "@/services/utils/cn";
import getMessageIconSVG from "@/helpers/getMessageIconSVG";

interface IProps {
  existedSizesFromDb: { color: string; quantity: number; size: string }[];
  translatedSubCategory: string;
}

const SizesModal = ({ existedSizesFromDb, translatedSubCategory }: IProps) => {
  const dispatch = useDispatch();

  const {
    sizes: sizesStored,
    color: currentColor,
    isSizeModalOpened,
  } = useSelector(selectCurrentProduct);

  const [isSizeGridTablesOpened, setIsSizGridTableOpened] =
    useState<boolean>(false);

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

  const isShoesSizes = () => {
    if (sizesStored?.length) {
      const shoesSizes = generalProductsFilers.filter(
        (item) => item.id === "sizes",
      )[0].sizesShoes;
      return shoesSizes?.includes(sizesStored.toString());
    }
  };

  const handleClickSize = (size: string) => {
    dispatch(setCurrentProductSize(size));
    dispatch(setIsSizeModalOpened(false));
  };

  useEffect(() => {
    if (sizesStored) {
      dispatch(setCurrentProductSize(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mb-8 1440:mb-10">
        <h4 className="mb-2 font-semibold text-base tracking-custom_4 text-primary">
          Розмір
        </h4>
        <div
          className={cn(
            "w-full h-14 flex items-center justify-between mb-2 px-4 py-4 border rounded-xl border-border text-base cursor-pointer",
            {
              "[&>svg]:rotate-180": isSizeModalOpened,
            },
          )}
          onClick={() => dispatch(setIsSizeModalOpened(true))}
        >
          <span
            className={cn("text-label", {
              "text-primary": sizesStored.length,
            })}
          >
            {sizesStored.length ? (
              <>{isShoesSizes() ? `${sizesStored} UA` : sizesStored}</>
            ) : (
              "Вибрати Розмір"
            )}
          </span>
          {getArrowDownSVG()}
        </div>
        <div className="flex gap-1 text-xs tracking-custom_2 text-label">
          <span>Вагаєтесь який розмір обрати?</span>
          <span
            onClick={() => setIsSizGridTableOpened(true)}
            className="text-primary cursor-pointer hover:underline"
          >
            Розмірна сітка
          </span>
        </div>

        <ResponsiveModal
          isOpen={isSizeGridTablesOpened}
          onClose={() => setIsSizGridTableOpened(false)}
        >
          <h3 className="mb-6 font-semibold text-xl text-center text-primary">
            Таблиці розмірів
          </h3>
          <SizeGridTables />
        </ResponsiveModal>

        <ResponsiveModal
          isOpen={isSizeModalOpened}
          onClose={() => dispatch(setIsSizeModalOpened(false))}
        >
          <div className="flex gap-6 flex-col">
            <h3 className="text-center font-semibold text-xl text-primary">
              Розмір
            </h3>
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
                </li>
              ))}
            </ul>
          </div>
        </ResponsiveModal>
      </div>
    </>
  );
};

export default SizesModal;
