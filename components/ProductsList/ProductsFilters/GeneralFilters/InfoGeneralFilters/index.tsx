'use client'

import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// redux
import { setDefaultsFilters } from "@/redux/generalFilters/generalFiltersSlice";

// types
import { IProductsFiltersProps } from "../.."
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

const InfoGeneralFilters = (props: IProductsFiltersProps) => {
  const dispatch = useDispatch()
  const filters = useSelector(selectGeneralFilters)

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const removeParamsGeneralFiltersFromUrl = () => {
    const params = new URLSearchParams(searchParams);
    
    params.delete("sizes");
    params.delete("price_to");
    params.delete("price_from");
    params.delete("color");
    
    return `${pathname}?${params.toString()}`;
  };

  const applyGeneralFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    if(filters.sizes.length) params.set("sizes", filters.sizes.join(','));
    if(filters.price.priceTo !== 10999) params.set("price_to", filters.price.priceTo.toString());
    if(filters.price.priceFrom !== 499) params.set("price_from", filters.price.priceFrom.toString());
    if(filters.color) params.set("color", filters.color);
    
    return `${pathname}?${params.toString()}`;
  };

  const handleRemoveFilters = () => {
    dispatch(setDefaultsFilters())
    router.push(removeParamsGeneralFiltersFromUrl())
  }

  const handleApplyFilters = () => {
    router.push(applyGeneralFilters())
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 text-sm font-medium text-[#272728] min-[2800px]:mb-8">
        {props.products?.length ? (
          <div className="flex gap-1">
            <span>{props.products?.length}</span>
            <span>товарів</span>
          </div>
        ) : (
          <h3 className="text-lg font-semibold mb-2 text-[#DF0707] min-[2800px]:text-3xl">Нічого не знайдено</h3>
        )}
        <button 
          onClick={() => handleRemoveFilters()}
          className="hover:opacity-50 underline hover:no-underline min-[2800px]:text-3xl"
        >
          Скинути фільтри
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button 
        onClick={() => handleApplyFilters()}
          className="m-auto w-full py-3 bg-blue text-white font-base font-medium rounded-xl hover:opacity-75 min-[2800px]:text-3xl"
        >
          Застосувати
        </button>
      </div>
    </>
  )
}

export default InfoGeneralFilters
