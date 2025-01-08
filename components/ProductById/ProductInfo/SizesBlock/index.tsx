"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//redux
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";
import {
  setCurrentProductSize,
  setIsSizeModalOpened,
} from "@/redux/currentProduct/currentProductSlice";

//services & helpers
import { cn } from "@/services/utils/cn";
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

//components
import ResponsiveModal from "@/components/Shared/ResponsiveModal";
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData";
import { SizeChoosingTable } from "./SizeChoosingTable/SizeChoosingTable";
import SizeGridTables from "../SizeGridTables";

export interface SizesBlockProps {
  existedSizesFromDb: { color: string; quantity: number; size: string }[];
  translatedSubCategory: string;
}

const SizesBlock = (props: SizesBlockProps) => {
  const [isSizesWindowBottom, setIsSizesWindowBottom] = useState(true);
  const [isSizesWindowOpened, setIsSizesWindowOpened] = useState(false);
  const [isSizeGridTablesOpened, setIsSizGridTableOpened] = useState(false);
  const dispatch = useDispatch();

  const { sizes: sizesStored, isSizeModalOpened } =
    useSelector(selectCurrentProduct);

  const isShoesSizes = () => {
    if (sizesStored?.length) {
      const shoesSizes = generalProductsFilers.filter(
        (item) => item.id === "sizes",
      )[0].sizesShoes;
      return shoesSizes?.includes(sizesStored.toString());
    }
  };

  const updateIsSizesWindowBottom = useCallback(() => {
    const containerWidth = window.innerWidth;
    setIsSizesWindowBottom(containerWidth < 768);
  }, []);

  useEffect(() => {
    if (sizesStored) {
      dispatch(setCurrentProductSize(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateIsSizesWindowBottom();
    window.addEventListener("resize", updateIsSizesWindowBottom);
    return () =>
      window.removeEventListener("resize", updateIsSizesWindowBottom);
  }, [updateIsSizesWindowBottom]);

  const handleCooseSizeClick = () => {
    if (isSizesWindowBottom) {
      dispatch(setIsSizeModalOpened(true));
      return;
    }
    setIsSizesWindowOpened((prev) => !prev);
  };

  return (
    <div className="mb-8 xl:mb-10">
      <h4 className="mb-2 font-semibold text-base tracking-custom_4 text-primary">
        Розмір
      </h4>
      <div
        className={cn(
          "relative w-full h-14 flex items-center justify-between mb-2 px-4 py-4 border rounded-xl border-border text-base cursor-pointer",
          {
            "[&>svg]:rotate-180": isSizeModalOpened || isSizesWindowOpened,
          },
          { "border-blue": isSizeModalOpened || isSizesWindowOpened },
        )}
        onClick={handleCooseSizeClick}
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

        {isSizesWindowOpened && !isSizesWindowBottom && (
          <div
            className={cn(
              "absolute top-[64px] left-0 z-50 w-full xl:max-w-[628px] max-h-[352px] border rounded-xl border-border bg-white overflow-hidden transition duration-300 transform origin-top",
              {
                "opacity-100 visible scale-y-100": isSizesWindowOpened,
                "opacity-0 invisible scale-y-0": !isSizesWindowOpened,
              },
            )}
            style={{
              transitionProperty: "transform, opacity",
              boxShadow: "0px 10px 20px 0px #0E0E1014",
            }}
          >
            <div className="">
              <SizeChoosingTable
                existedSizesFromDb={props.existedSizesFromDb}
                translatedSubCategory={props.translatedSubCategory}
              />
            </div>
          </div>
        )}
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

      {isSizesWindowBottom && (
        <ResponsiveModal
          isOpen={isSizeModalOpened}
          onClose={() => dispatch(setIsSizeModalOpened(false))}
        >
          <SizeChoosingTable
            existedSizesFromDb={props.existedSizesFromDb}
            translatedSubCategory={props.translatedSubCategory}
          />
        </ResponsiveModal>
      )}

      <ResponsiveModal
        isOpen={isSizeGridTablesOpened}
        onClose={() => setIsSizGridTableOpened(false)}
      >
        <h3 className="mb-6 font-semibold text-xl text-center text-primary">
          Таблиці розмірів
        </h3>
        <SizeGridTables />
      </ResponsiveModal>
    </div>
  );
};

export default SizesBlock;
