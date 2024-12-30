import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/services/utils/cn";
// redux
import { setDefaultsFilters } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// components
import SortingFilterXL from "./SortingFilterXL";
import NewSizeFilterXL from "./NewSizeFilterXL";
import NewColorFilterXL from "./NewColorFilterXL";
import NewPriceFilterXL from "./NewPriceFilterXL";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

// helpers
import { getFilteredProductsClientSide } from "@/helpers/getFilteredProducts";

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

  // select / size / color / price  /  "" - не выбран
  const [isChosenFilter, setIsChosenFilter] = useState("");

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
    params.set("sortedBy", chosenSorting);
    return `${pathname}?${params.toString()}`;
  };

  const handleApplyFilters = () => {
    router.push(applyGeneralFilters());
    setOpenedChangesFilters(false);
  };

  const createPageURLWithPageParams = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortedBy", filterValue.toString());
    return `${pathname}?${params.toString()}`;
  };

  let showSelectedSize;
  if (!filters.sizes || filters?.sizes.length == 0) {
    showSelectedSize = "Розмір";
  } else {
    showSelectedSize = filters.sizes.join(", ");
  }

  let showSelectedColor;
  if (!filters.color || filters?.color.length == 0) {
    showSelectedColor = "Колір";
  } else {
    showSelectedColor = (
      <div
        className={cn(
          "size-8 rounded-[50%]",
          `bg-${filters.color}`,
          "min-[2800px]:size-16",
          {
            "border-[1px] xl:border-timer": filters.color === "white",
            "bg-colorful-circle bg-center bg-cover":
              filters.color === "colorful",
          },
        )}
      ></div>
    );
  }

  let showSelectedPrice;
  if (filters.price.priceFrom == 499 && filters.price.priceTo == 10999) {
    showSelectedPrice = "Ціна";
  } else {
    showSelectedPrice = `${filters.price.priceFrom} - ${filters.price.priceTo}`;
  }

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
  }, [isChosenFilter]);

  return (
    <div className="font-pangram hidden xl:block mb-5 w-[100%] h-[148px] py-6 bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center pb-4">
          <p className="font-semibold text-xl text-title pr-4">Фільтр</p>
          <div
            className="classItemFilterText text-sm hover:underline hover:cursor-pointer"
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
                  isChosenFilter={isChosenFilter}
                  setIsChosenFilter={setIsChosenFilter}
                />
                <NewSizeFilterXL
                  title={showSelectedSize}
                  params={params}
                  products={products}
                  isChosenFilter={isChosenFilter}
                  setIsChosenFilter={setIsChosenFilter}
                />
                <NewColorFilterXL
                  title={showSelectedColor}
                  isChosenFilter={isChosenFilter}
                  setIsChosenFilter={setIsChosenFilter}
                />
                <NewPriceFilterXL
                  title={showSelectedPrice}
                  isChosenFilter={isChosenFilter}
                  setIsChosenFilter={setIsChosenFilter}
                />
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
