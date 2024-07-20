'use client'

import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// redux
import { setDefaultsFilters } from "@/redux/generalFilters/generalFiltersSlice";
import { selectGeneralFilters } from "@/redux/generalFilters/generalFiltersSelector";

// types
import { IProductsFiltersProps } from "../.."

// helpers
import { getFilteredProductsClientSide } from "@/helpers/getFilteredProducts";
import { cn } from "@/services/utils/cn";

interface IProps extends IProductsFiltersProps {
  onClose: () => void
}

const InfoGeneralFilters = (props: IProps) => {
  const dispatch = useDispatch()
  const filters = useSelector(selectGeneralFilters)

  const [filteredProductsByGeneralFilters, setFilteredProductsByGeneralFilters] = useState([...props.products])

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isButtonDisabled = () => {
        if((!filters.sizes.length)
      && (filters.price.priceTo === 10999)
      && (filters.price.priceFrom === 499)
      && !filters.color) {
        return true
      }
    return false
  }

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
    if(!isButtonDisabled()) {
      router.push(applyGeneralFilters())
      props.onClose()
    }
  }

  useEffect(()=>{
  const arraOfFiltersFromFiltersObject = Object.entries({
      ...filters,
      price_to: filters.price.priceTo,
      price_from: filters.price.priceFrom,
      sub_category: props.params.sub_category[0],
    }).map(([key, value]) => ({ [key]: value }));
    
    const filteredProductsByGeneralFilters = getFilteredProductsClientSide({products: props.products, filters: arraOfFiltersFromFiltersObject})

    setFilteredProductsByGeneralFilters([...filteredProductsByGeneralFilters])
  },[filters, props])
  console.log("🚀 ~ }).map ~ props:", props)

  return (
    <>
      <div className="flex justify-between items-center mb-4 text-sm font-medium text-[#272728] min-[2800px]:mb-8">
        {props.products?.length ? (
          <div className="flex gap-1">
            <span>{filteredProductsByGeneralFilters?.length}</span>
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
          disabled={isButtonDisabled()}
          onClick={() => handleApplyFilters()}
          className={cn("m-auto w-full py-3 bg-blue text-white font-base font-medium rounded-xl hover:opacity-75",
            'min-[2800px]:text-3xl', {
              'disabled:opacity-[50%]': isButtonDisabled()
            }
          )}
        >
          Застосувати
        </button>
      </div>
    </>
  )
}

export default InfoGeneralFilters
