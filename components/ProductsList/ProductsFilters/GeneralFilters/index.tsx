'use client'

import { useState } from "react";

// assets
import getFiltersIconSVG from "@/helpers/getFiltersIconSVG";

// data
import { generalProductsFilers } from "../filtersData";

// utils
import { cn } from "@/services/utils/cn";

// components
import FilterModal from "../FilterModal";
import PriceFilter from "./PriceFilter";

// types
import { IProductsFiltersProps } from "..";
import ColorsFilter from "./ColorsFilter";
import GenderFilter from "./GenderFilter";
import SizeFilter from "./SizeFilter";

const GeneralFilters = (props: IProductsFiltersProps) => {
  const [isGeneralFilterOpen, setIsGeneralFilterOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsGeneralFilterOpen(true)}
        className={cn("p-3 cursor-pointer border-[1px] rounded-xl border-[#E7E7E8] [&>svg]:hover:opacity-50")}
        >
        {getFiltersIconSVG()}
      </div>
      <FilterModal isOpen={isGeneralFilterOpen} onClose={() => setIsGeneralFilterOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center">Фільтри</h2>
        {generalProductsFilers.map((generalFilter, index) => (
          <div className="mb-10" key={index}>
            {generalFilter.id === 'sizes' && generalFilter.shoesPosibleProductTypes?.includes(props.params.sub_category[0]) ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-4">{generalFilter.title}</h3>
                <SizeFilter sizes={generalFilter.sizesShoes} />
              </>
              ) : null}
            {generalFilter.id === 'sizes' && !generalFilter.shoesPosibleProductTypes?.includes(props.params.sub_category[0]) ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-4">{generalFilter.title}</h3>
                <SizeFilter sizes={generalFilter.sizesClothes} />
                </>
              ) : null}
            {generalFilter.id === 'price' ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5">{generalFilter.title}</h3>
                <PriceFilter />
              </>
            ) : null}
            {generalFilter.id === 'color' && generalFilter.colorValues ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5">{generalFilter.title}</h3>
                <ColorsFilter colors={generalFilter.colorValues} />
              </>
            ) : null}
            {generalFilter.id === 'gender' && generalFilter.genderValues ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5">{generalFilter.title}</h3>
                <GenderFilter values={generalFilter.genderValues} />
              </>
            ) : null}
          </div>
        ))}
        <div className={cn("mb-4 pt-6 relative", 
          'before:absolute before:top-0 before:left-[-24px] before:w-full before:h-[1px] before:bg-[#E7E7E8]')}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Нічого не знайдено</h3>
            <button className="text-sm font-medium text-[#272728] hover:opacity-50">Скинути фільтри</button>
          </div>
          <div className="flex justify-center items-center">
            <button className="m-auto w-full py-3 bg-blue text-white font-base font-medium rounded-xl hover:opacity-75">Застосувати</button>
          </div>
        </div>
      </FilterModal>
    </>
  )
}

export default GeneralFilters