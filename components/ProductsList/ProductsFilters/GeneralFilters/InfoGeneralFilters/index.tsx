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
    
    params.delete("size");
    params.delete("size");
    params.delete("price_to");
    params.delete("price_from");
    params.delete("color");
    
    return `${pathname}?${params.toString()}`;
  };

  const applyGeneralFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    params.set("size", filters.clothesSizes.join(','));
    params.set("price_to", filters.price.priceTo.toString());
    params.set("price_from", filters.price.priceFrom.toString());
    params.set("color", filters.color);
    
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
      <div className="flex justify-between items-center mb-4 text-sm font-medium text-[#272728]">
        {props.products?.length ? (
          <div className="flex gap-1">
            <span>{props.products?.length}</span>
            <span>товарів</span>
          </div>
        ) : (
          <h3 className="text-lg font-semibold mb-2 text-[#DF0707]">Нічого не знайдено</h3>
        )}
        <button 
          onClick={() => handleRemoveFilters()}
          className="hover:opacity-50 underline hover:no-underline"
        >
          Скинути фільтри
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button 
        onClick={() => handleApplyFilters()}
          className="m-auto w-full py-3 bg-blue text-white font-base font-medium rounded-xl hover:opacity-75"
        >
          Застосувати
        </button>
      </div>
    </>
  )
}

export default InfoGeneralFilters
