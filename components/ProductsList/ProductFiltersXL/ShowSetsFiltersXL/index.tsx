import React, { useState } from "react";
import { cn } from "@/services/utils/cn";

// helpers
import getSortingIconSVG18 from "@/helpers/getSortingIconSVG18";
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

// typess

import { IFilters } from "@/app/products/[...sub_category]/page";

export interface IProductsFiltersProps {
  searchParams: IFilters;
}

interface ICurrentProps {
  searchParams: IFilters;
  setOpenedChangesFilters: (isOpen: boolean) => void;
}

const ShowSetsFiltersXL = ({
  searchParams,
  setOpenedChangesFilters,
}: ICurrentProps) => {
  const [isShowSortiing, setIsShowSorting] = useState(true);
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowSize, setIsShowSize] = useState(true);
  const [isShowColor, setIsShowColor] = useState(true);

  const classItemFilter =
    "h-9 rounded-lg bg-border_button flex items-center pl-4";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium";
  const classItemFilterIconClose = "ml-2 mr-3  p-1 cursor-pointer";

  let colorString = "Всі кольори";
  let styleLable = {
    lable: "rounded-full h-[18px] w-[18px]  border border-[#b7b7b8] mr-3",
  };

  let colorLable = "";

  if (searchParams.color === "white") {
    colorString = "Білий";
    colorLable = cn(styleLable.lable, "bg-white");
  } else if (searchParams.color === "black") {
    colorString = "Чорний";
    colorLable = cn(styleLable.lable, "bg-black");
  } else if (searchParams.color === "blue") {
    colorString = "Синій";
    colorLable = cn(styleLable.lable, "bg-blue");
  } else {
    colorString = "Кольоровий";
    colorLable = cn(
      styleLable.lable,
      "bg-gradient-to-r from-[#00ffff] to-[#0080ff] to-[#ff0080]",
    );
  }

  let sortedString = "Рекомендовані";
  if (searchParams.sortedBy === "ascent") {
    sortedString = "Від найдешевшої";
  } else if (searchParams.sortedBy === "descent") {
    sortedString = "Від найдорожчої";
  }

  const lowerPrice = searchParams.price_from ? searchParams.price_from : 499;

  return (
    <div className="font-pangram hidden xl:flex items-center mb-5 w-[100%] h-[64px] bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center">
          <p className="font-semibold text-xl text-title pr-8">Фільтр</p>
          <div className="flex justify-start">
            <ul className="flex justify-start space-x-2">
              {isShowSortiing ? (
                <li className={classItemFilter}>
                  <div className="pr-3">{getSortingIconSVG18()}</div>
                  <div className={classItemFilterText}>{sortedString}</div>
                  <div
                    className={classItemFilterIconClose}
                    onClick={() => setIsShowSorting(false)}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
              {isShowPrice ? (
                <li className={classItemFilter}>
                  <div className={classItemFilterText}>
                    {searchParams.price_to
                      ? `${lowerPrice}  грн  - ${searchParams.price_to} грн`
                      : "Весь діапазон цін"}
                  </div>
                  <div
                    className={classItemFilterIconClose}
                    onClick={() => setIsShowPrice(false)}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
              {isShowColor ? (
                <li className={classItemFilter}>
                  {searchParams.color ? (
                    <>
                      {" "}
                      <div className={colorLable}></div>
                      <div className={classItemFilterText}>{colorString}</div>
                    </>
                  ) : (
                    <div className={classItemFilterText}>Всі кольори</div>
                  )}

                  <div
                    className={classItemFilterIconClose}
                    onClick={() => setIsShowColor(false)}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
              {isShowSize ? (
                <li className={classItemFilter}>
                  <div className={classItemFilterText}>
                    {searchParams.sizes ? (
                      searchParams.sizes
                    ) : (
                      <div className={classItemFilterText}>Всі розміри</div>
                    )}
                  </div>
                  <div
                    className={classItemFilterIconClose}
                    onClick={() => setIsShowSize(false)}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div
          className="flex  items-center text-sm font-semibold text-[#3E3E40] hover:underline cursor-pointer"
          onClick={() => setOpenedChangesFilters(true)}
        >
          Змінити
        </div>
      </div>
    </div>
  );
};

export default ShowSetsFiltersXL;
