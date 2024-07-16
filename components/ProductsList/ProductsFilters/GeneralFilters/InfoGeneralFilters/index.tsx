'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IProductsFiltersProps } from "../.."

const InfoGeneralFilters = (props: IProductsFiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const removeParamsGeneralFiltersFromUrl = () => {
    const params = new URLSearchParams(searchParams);
    
    params.delete("size");
    params.delete("price_to");
    params.delete("price_from");
    params.delete("color");
    console.log(`${pathname}?${params.toString()}`);
    
    return `${pathname}?${params.toString()}`;
  };

  return (
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
      onClick={() => router.push(removeParamsGeneralFiltersFromUrl())}
        className="hover:opacity-50 underline hover:no-underline"
      >Скинути фільтри</button>
    </div>
  )
}

export default InfoGeneralFilters
