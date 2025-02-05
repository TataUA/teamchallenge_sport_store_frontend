import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowSize, setIsShowSize] = useState(true);
  const [isShowColor, setIsShowColor] = useState(true);

  const searchParamsURL = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const removeParamsGeneralFiltersFromUrl = (id: string) => {
    const params = new URLSearchParams(searchParamsURL);

    if (id == "size") {
      params.delete("sizes");
    } else if (id == "price") {
      params.delete("price_to");
      params.delete("price_from");
    } else if (id == "color") {
      params.delete("color");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleShowPrice = () => {
    setIsShowPrice(false);
    removeParamsGeneralFiltersFromUrl("price");
  };
  const handleShowColor = () => {
    setIsShowColor(false);
    removeParamsGeneralFiltersFromUrl("color");
  };
  const handleShowSize = () => {
    setIsShowSize(false);
    removeParamsGeneralFiltersFromUrl("size");
  };

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
    colorLable = cn(styleLable.lable, "bg-colorful-circle");
  }

  let sortedString = "Рекомендовані";
  if (searchParams.sortedBy === "ascent") {
    sortedString = "Від найдешевшого";
  } else if (searchParams.sortedBy === "descent") {
    sortedString = "Від найдорожчого";
  }

  const lowerPrice = searchParams.price_from ? searchParams.price_from : 499;
  const upperPrice = searchParams.price_to ? searchParams.price_to : 10999;

  return (
    <div className="font-pangram hidden lg:flex items-center mb-5 w-[100%] h-[64px] bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center">
          <p className="font-semibold text-xl text-title pr-8">Фільтр</p>
          <div className="flex justify-start">
            <ul className="flex justify-start space-x-2">
              <li className={classItemFilter}>
                <div className="pr-3">{getSortingIconSVG18()}</div>
                <div className={classItemFilterText}>{sortedString}</div>
                <div className={classItemFilterIconClose}></div>
              </li>

              {isShowPrice &&
              (searchParams.price_from || searchParams.price_to) ? (
                <li className={classItemFilter}>
                  <div className={classItemFilterText}>
                    {searchParams.price_to && searchParams.price_from
                      ? `${lowerPrice}  грн  - ${upperPrice} грн`
                      : null}
                    {!searchParams.price_to && searchParams.price_from
                      ? `${lowerPrice}  грн  - 10999 грн`
                      : null}
                    {searchParams.price_to && !searchParams.price_from
                      ? `499 грн  - ${upperPrice} грн`
                      : null}
                  </div>
                  <div
                    className={classItemFilterIconClose}
                    onClick={() => handleShowPrice()}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
              {isShowColor && searchParams.color ? (
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
                    onClick={() => handleShowColor()}
                  >
                    {getCloseIconSVG18()}
                  </div>
                </li>
              ) : null}
              {isShowSize && searchParams.sizes ? (
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
                    onClick={() => handleShowSize()}
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
