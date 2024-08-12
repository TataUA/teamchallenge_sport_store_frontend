'use client'

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// helpers
import getSortingIconSVG from "@/helpers/getSortingIconSVG";
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn";

// components
import ResponsiveModal from "../../../Shared/ResponsiveModal";

// data
import { sortingProductsFilers } from "../filtersData";

const SortingFilters = () => {
  const [isSortingFilterOpen, setIsSortingFilterOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilterValue = searchParams.get("sortedBy") || 'popularity';

  const createPageURLWithPageParams = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortedBy", filterValue.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleClick = (id: string) => {
    setIsSortingFilterOpen(false)
  }

  return (
    <div>
      <div
        onClick={() => setIsSortingFilterOpen(true)}
        className={cn(
          "p-3 cursor-pointer border-[1px] rounded-xl border-[#E7E7E8] [&>svg]:hover:opacity-50",
          'min-[2800px]:[&>svg]:size-14')}>
        {getSortingIconSVG()}
      </div>
      <ResponsiveModal isOpen={isSortingFilterOpen} onClose={() => setIsSortingFilterOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center min-[2800px]:text-4xl min-[2800px]:mb-8">Сортування</h2>
        {sortingProductsFilers.map((item, index) => (
          <div key={item.id} className="mb-4 min-[2800px]:mb-8">
            <div className={cn("flex justify-between items-center px-4 [&>svg]:fill-[#0A4CF6] [&>svg]:hidden [&>svg]:mb-2", {
              '[&>svg]:block': currentFilterValue === item.id.toLocaleLowerCase()
            })}>
              <Link 
                className={cn("text-base text-[#272728] mb-2 font-medium cursor-pointer hover:text-[#0A4CF6] min-[2800px]:text-3xl", {
                  'text-[#0A4CF6]': currentFilterValue === item.id.toLocaleLowerCase()
                })}
                onClick={() => handleClick(item.id)}
                href={createPageURLWithPageParams(item.id)}
                >
                  {item.title}
                </Link>
                {getCheckedIconSVG()}
            </div>
            <hr />
          </div>
        ))}
      </ResponsiveModal>
    </div>
  )
}

export default SortingFilters
