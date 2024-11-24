import React, { useState } from "react";

// helpers
import getSortingIconSVG18 from "@/helpers/getSortingIconSVG18";
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

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
}

const ControlFiltersXL = (props: IProductsFiltersProps) => {
  const [isOpenedChangesFilters, setOpenedChangesFilters] = useState(true);

  const { searchParams, params, products } = props;

  const classItemFilter =
    "h-9 rounded-lg bg-border_button flex items-center pl-4";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium";
  const classItemFilterIconClose = "ml-2 mr-3  p-1 hover:bg-white";

  return (
    <div className="font-pangram hidden xl:flex items-center mb-5 w-[100%] h-[95px] bg-[#a787f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center">
          <p className="font-semibold text-xl text-title pr-8">Фільтр</p>
          <div className="flex justify-start">
            <ul className="flex justify-start space-x-2">
              <li className={classItemFilter}>
                <div className="pr-3">{getSortingIconSVG18()}</div>
                <div className={classItemFilterText}>Рекомендовані</div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>500 грн - 3000 грн</div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                <div className="rounded-full h-[18px] w-[18px] bg-white bor border border-[#b7b7b8] mr-3"></div>
                <div className={classItemFilterText}>Білий</div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>42 UA</div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex  items-center text-sm font-semibold text-[#3E3E40] hover:underline ">
          Змінити
        </div>
      </div>
    </div>
  );
};

export default ControlFiltersXL;
