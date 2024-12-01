import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// redux
import { setDefaultsFilters } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// components
import SortingFilterXL from "./SortingFilterXL";

import ControlFilterItem from "./ControlFilterItem";
import PriceFilterXL from "./PriceFilterXL";
import ColorsFilterXL from "./ColorFilterXL";
import SizeFilterXL from "./SizeFilterXL";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

// helpers
import { getFilteredProductsClientSide } from "@/helpers/getFilteredProducts";

import { generalProductsFilers } from "../../ProductsFilters/filtersData";

export interface IProductsFiltersProps {
  searchParamsFilter: IFilters;
  params: { sub_category: string[] };
  products: IProduct[];
  setOpenedChangesFilters: (isOpen: boolean) => void;
}

const ControlFiltersXL = (props: IProductsFiltersProps) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectGeneralFilters);

  const [
    filteredProductsByGeneralFilters,
    setFilteredProductsByGeneralFilters,
  ] = useState([...props.products]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [chosenSorting, setChosenSorting] = useState("");

  const { searchParamsFilter, params, products, setOpenedChangesFilters } =
    props;

  const removeParamsGeneralFiltersFromUrl = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sizes");
    params.delete("price_to");
    params.delete("price_from");
    params.delete("color");
    params.set("sortedBy", "popularity");

    return `${pathname}?${params.toString()}`;
  };

  const handleRemoveFilters = () => {
    dispatch(setDefaultsFilters());
    router.push(removeParamsGeneralFiltersFromUrl());
  };

  const applyGeneralFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (filters.sizes.length) {
      params.set("sizes", filters.sizes.join(","));
    } else {
      params.delete("sizes");
    }
    if (filters.price.priceTo !== 10999) {
      params.set("price_to", filters.price.priceTo.toString());
    } else {
      params.delete("price_to");
    }
    if (filters.price.priceFrom !== 499) {
      params.set("price_from", filters.price.priceFrom.toString());
    } else {
      params.delete("price_from");
    }
    if (filters.color) {
      params.set("color", filters.color);
    } else {
      params.delete("color");
    }

    return `${pathname}?${params.toString()}`;
  };

  // const isButtonDisabled = () => {
  //   if (
  //     !filters.sizes.length &&
  //     filters.price.priceTo === 10999 &&
  //     filters.price.priceFrom === 499 &&
  //     !filters.color
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleApplyFilters = () => {
    // if (!isButtonDisabled()) {
    router.push(applyGeneralFilters());
    setOpenedChangesFilters(false);
    //}
  };

  const createPageURLWithPageParams = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortedBy", filterValue.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const arraOfFiltersFromFiltersObject = Object.entries({
      ...filters,
      price_to: filters.price.priceTo,
      price_from: filters.price.priceFrom,
      sub_category: props.params.sub_category[0],
    }).map(([key, value]) => ({ [key]: value }));
    const filteredProductsByGeneralFilters = getFilteredProductsClientSide({
      products: props.products,
      filters: arraOfFiltersFromFiltersObject,
    });
    setFilteredProductsByGeneralFilters([...filteredProductsByGeneralFilters]);
    router.push(createPageURLWithPageParams(chosenSorting));
  }, [chosenSorting]);

  return (
    <div className="font-pangram hidden xl:block mb-5 w-[100%] h-[148px] py-6 bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center pb-4">
          <p className="font-semibold text-xl text-title pr-4">Фільтр</p>
          <div
            className="classItemFilterText text-sm hover:underline"
            onClick={() => handleRemoveFilters()}
          >
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
                <SortingFilterXL
                  searchParams={searchParamsFilter}
                  chosenSorting={chosenSorting}
                  setChosenSorting={setChosenSorting}
                />

                <ControlFilterItem title="Розмір" width="w-auto" hight="h-auto">
                  {generalProductsFilers.map((generalFilter, index) => (
                    <div className="mb-2 min-[2800px]:mb-20" key={index}>
                      {generalFilter.id === "sizes" &&
                      generalFilter.shoesPosibleProductTypes?.includes(
                        props.params.sub_category[0],
                      ) ? (
                        <div className="px-4 pt-0">
                          <SizeFilterXL
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
                          <SizeFilterXL
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
                  width="w-[252px]"
                  hight="h-auto"
                >
                  {generalProductsFilers.map((generalFilter, index) => (
                    <div className="mb-2 min-[2800px]:mb-20" key={index}>
                      {generalFilter.id === "color" &&
                      generalFilter.colorValues ? (
                        <div className="px-4 ">
                          <ColorsFilterXL colors={generalFilter.colorValues} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </ControlFilterItem>
                <ControlFilterItem
                  title="Ціна"
                  width="w-[436px]"
                  hight="h-[140px]"
                >
                  <PriceFilterXL />
                </ControlFilterItem>
              </ClientComponent>
            </ul>
          </div>
        </div>
        <div
          className="flex  items-center text-base font-semibold text-common hover:bg-white px-6 py-[11px] my-1 rounded-xl border border-[#323234] cursor-pointer"
          onClick={() => handleApplyFilters()}
        >
          Застосувати
        </div>
      </div>
    </div>
  );
};

export default ControlFiltersXL;
