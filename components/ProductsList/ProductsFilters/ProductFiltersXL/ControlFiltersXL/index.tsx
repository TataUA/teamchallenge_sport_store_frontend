import React, { useState } from "react";

// helpers
import getSortingIconSVG18 from "@/helpers/getSortingIconSVG18";
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

import {
  sortingProductsFilers,
  generalProductsFilers,
} from "../../filtersData";

export interface IProductsFiltersProps {
  searchParams: IFilters;
  params: { sub_category: string[] };
  products: IProduct[];
  setOpenedChangesFilters: (isOpen: boolean) => void;
}

const ControlFiltersXL = (props: IProductsFiltersProps) => {
  const { searchParams, params, products, setOpenedChangesFilters } = props;

  const classItemFilter =
    "h-14 md:w-[160px] xl:w-[252px] rounded-xl border border-border  bg-white flex  justify-between items-center pl-4 ";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium";

  const classItemFilterIcon = "ml-2 mr-3  p-1 ";

  return (
    <div className="font-pangram hidden xl:block mb-5 w-[100%] h-[148px] py-6 bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center pb-4">
          <p className="font-semibold text-xl text-title pr-4">Фільтр</p>
          <div className="classItemFilterText text-sm hover:underline">
            {" "}
            Очиcтити фільтр{" "}
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex justify-start space-x-2">
          <div className="flex justify-start">
            <ul className="flex justify-start items-center space-x-3">
              <li className={classItemFilter}>
                <div className="flex justify-between">
                  <div className="pr-3">{getSortingIconSVG18()}</div>
                  <div className={classItemFilterText}>Рекомендовані</div>
                </div>

                <div className={classItemFilterIcon}>{getArrowDownSVG()}</div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>500 грн - 3000 грн</div>
                <div className={classItemFilterIcon}>{getArrowDownSVG()}</div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>Білий</div>
                <div className={classItemFilterIcon}>{getArrowDownSVG()}</div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>42 UA</div>
                <div className={classItemFilterIcon}>{getArrowDownSVG()}</div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex  items-center text-base font-semibold text-common hover:bg-white px-6 py-3 my-1 rounded-xl border border-[#323234] "
          onClick={() => setOpenedChangesFilters(false)}
        >
          Застосувати
        </div>
      </div>
    </div>
  );
};

export default ControlFiltersXL;
