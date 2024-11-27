import React, { useState } from "react";
import { ClientComponent } from "@/components/ClientComponent";
// components
import SortingFilterXL from "./SortingFilterXL";

import ControlFilterItem from "./ControlFilterItem";
import PriceFilter from "../../ProductsFilters/GeneralFilters/PriceFilter";
import ColorsFilter from "../../ProductsFilters/GeneralFilters/ColorsFilter";
import SizeFilter from "../../ProductsFilters/GeneralFilters/SizeFilter";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

import { generalProductsFilers } from "../../ProductsFilters/filtersData";

export interface IProductsFiltersProps {
  searchParams: IFilters;
  params: { sub_category: string[] };
  products: IProduct[];
  setOpenedChangesFilters: (isOpen: boolean) => void;
}

const ControlFiltersXL = (props: IProductsFiltersProps) => {
  const { searchParams, params, products, setOpenedChangesFilters } = props;

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
          <div className="flex justify-start ">
            <ul className="flex  justify-start items-center space-x-3">
              <ClientComponent>
                <SortingFilterXL searchParams={searchParams} />

                <ControlFilterItem title="Розмір" width="w-auto" hight="h-auto">
                  {generalProductsFilers.map((generalFilter, index) => (
                    <div className="mb-2 min-[2800px]:mb-20" key={index}>
                      {generalFilter.id === "sizes" &&
                      generalFilter.shoesPosibleProductTypes?.includes(
                        props.params.sub_category[0],
                      ) ? (
                        <div className="px-4 pt-0">
                          <SizeFilter
                            products={props.products}
                            shoesSizes={generalFilter.sizesShoes}
                          />
                        </div>
                      ) : null}
                      {generalFilter.id === "sizes" &&
                      !generalFilter.shoesPosibleProductTypes?.includes(
                        props.params.sub_category[0],
                      ) ? (
                        <div className="w-auto px-4">
                          <SizeFilter
                            products={props.products}
                            clothesSizes={generalFilter.sizesClothes}
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </ControlFilterItem>
                <ControlFilterItem
                  title="Колір"
                  width="w-[254px]"
                  hight="h-auto"
                >
                  {generalProductsFilers.map((generalFilter, index) => (
                    <div className="mb-2 min-[2800px]:mb-20" key={index}>
                      {generalFilter.id === "color" &&
                      generalFilter.colorValues ? (
                        <div className="px-4 ">
                          <ColorsFilter colors={generalFilter.colorValues} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </ControlFilterItem>
                <ControlFilterItem
                  title="Ціна"
                  width="w-[320px]"
                  hight="h-[140px]"
                >
                  <PriceFilter />
                </ControlFilterItem>
              </ClientComponent>
            </ul>
          </div>
        </div>
        <div
          className="flex  items-center text-base font-semibold text-common hover:bg-white px-6 py-3 my-1 rounded-xl border border-[#323234] cursor-pointer"
          onClick={() => setOpenedChangesFilters(false)}
        >
          Застосувати
        </div>
      </div>
    </div>
  );
};

export default ControlFiltersXL;
