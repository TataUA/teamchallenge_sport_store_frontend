'use client'

import { useState } from "react";

// assets
import getFiltersIconSVG from "@/helpers/getFiltersIconSVG";

// data
import { generalProductsFilers } from "../filtersData";

// utils
import { cn } from "@/services/utils/cn";

// components
import ResponsiveModal from "../../../shared/ResponsiveModal";
import PriceFilter from "./PriceFilter";
import ColorsFilter from "./ColorsFilter";
import GenderFilter from "./GenderFilter";
import SizeFilter from "./SizeFilter";
import InfoGeneralFilters from "./InfoGeneralFilters";

// types
import { IProductsFiltersProps } from "..";

const GeneralFilters = (props: IProductsFiltersProps) => {

  const [isGeneralFilterOpen, setIsGeneralFilterOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsGeneralFilterOpen(true)}
        className={cn("p-3 cursor-pointer border-[1px] rounded-xl border-[#E7E7E8] [&>svg]:hover:opacity-50",
          'min-[2800px]:[&>svg]:size-14'
        )}
        >
        {getFiltersIconSVG()}
      </div>
      <ResponsiveModal isOpen={isGeneralFilterOpen} onClose={() => setIsGeneralFilterOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center min-[2800px]:text-4xl">Фільтри</h2>
        {generalProductsFilers.map((generalFilter, index) => (
          <div className="mb-10 min-[2800px]:mb-20" key={index}>
            {generalFilter.id === 'sizes' && generalFilter.shoesPosibleProductTypes?.includes(props.params.sub_category[0]) ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-4 min-[2800px]:text-4xl min-[2800px]:mb-8">{generalFilter.title}</h3>
                <SizeFilter products={props.products} shoesSizes={generalFilter.sizesShoes} />
              </>
              ) : null}
            {generalFilter.id === 'sizes' && !generalFilter.shoesPosibleProductTypes?.includes(props.params.sub_category[0]) ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-4 min-[2800px]:text-4xl min-[2800px]:mb-8">{generalFilter.title}</h3>
                <SizeFilter products={props.products} clothesSizes={generalFilter.sizesClothes} />
                </>
              ) : null}
            {generalFilter.id === 'price' ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5 min-[2800px]:text-4xl min-[2800px]:mb-10">{generalFilter.title}</h3>
                <PriceFilter />
              </>
            ) : null}
            {generalFilter.id === 'color' && generalFilter.colorValues ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5 min-[2800px]:text-4xl min-[2800px]:mb-10">{generalFilter.title}</h3>
                <ColorsFilter colors={generalFilter.colorValues} />
              </>
            ) : null}
            {generalFilter.id === 'gender' && generalFilter.genderValues ? (
              <>
                <h3 className="text-base font-semibold text-[#272728] mb-5 min-[2800px]:text-4xl min-[2800px]:mb-10">{generalFilter.title}</h3>
                <GenderFilter values={generalFilter.genderValues} />
              </>
            ) : null}
          </div>
        ))}
        <div className={cn("mb-4 pt-6 relative", 
          'before:absolute before:top-0 before:left-[-24px] before:w-full before:h-[1px] before:bg-[#E7E7E8]')}>
            <InfoGeneralFilters onClose={() => setIsGeneralFilterOpen(false)} {...props} />
        </div>
      </ResponsiveModal>
    </>
  )
}

export default GeneralFilters
