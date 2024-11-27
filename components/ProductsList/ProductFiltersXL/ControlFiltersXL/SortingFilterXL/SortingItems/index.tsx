"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// helpers
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn";

// data
import { sortingProductsFilers } from "../../../../ProductsFilters/filtersData";

const SortingItems = () => {
  const [isSortingFilterOpen, setIsSortingFilterOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilterValue = searchParams.get("sortedBy") || "popularity";

  const createPageURLWithPageParams = (filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortedBy", filterValue.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleClick = (id: string) => {
    setIsSortingFilterOpen(false);
  };

  return (
    <div className="relative">
      <div className="absolute z-10 bg-white border border-border rounded-xl w-[250px] top-8 left-[-240px]">
        <h2 className="text-2xl font-bold mb-4 text-center min-[2800px]:text-4xl min-[2800px]:mb-8">
          Сортування
        </h2>
        {sortingProductsFilers.map((item, index) => (
          <div key={item.id} className="mb-4 min-[2800px]:mb-8">
            <div
              className={cn(
                "flex justify-between items-center px-4 [&>svg]:fill-blue [&>svg]:hidden [&>svg]:mb-2",
                {
                  "[&>svg]:block":
                    currentFilterValue === item.id.toLocaleLowerCase(),
                },
              )}
            >
              <Link
                className={cn(
                  "text-base text-[#272728] mb-2 font-medium cursor-pointer hover:text-blue min-[2800px]:text-3xl",
                  {
                    "text-blue":
                      currentFilterValue === item.id.toLocaleLowerCase(),
                  },
                )}
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
      </div>
    </div>
  );
};

export default SortingItems;
