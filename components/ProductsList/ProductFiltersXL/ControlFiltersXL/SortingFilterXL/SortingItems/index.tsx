"use client";
import { cn } from "@/services/utils/cn";
// helpers
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";

// data
import { sortingProductsFilers } from "../../../../ProductsFilters/filtersData";

interface ISortingItemsProps {
  setChosenSorting: (id: string) => void;
  chosenSorting: string;
  setIsSortingString: (id: string) => void;
  setIsSortingArrowUp: (id: boolean) => void;
}

const SortingItems = (props: ISortingItemsProps) => {
  const {
    setChosenSorting,
    chosenSorting,
    setIsSortingString,
    setIsSortingArrowUp,
  } = props;

  const currentFilterValue = chosenSorting;

  const handleClick = (id: string) => {
    setChosenSorting(id);

    let sortedString: string;
    if (id === "ascent") {
      sortedString = "Від найдешевшого";
    } else if (id === "descent") {
      sortedString = "Від найдорожчого";
    } else {
      sortedString = "Рекомендовані";
    }
    setIsSortingString(sortedString);
    setIsSortingArrowUp(false);
  };

  return (
    <div className="relative">
      <div
        className="absolute z-10 bg-white border border-border rounded-xl lg:w-[180px] xl:w-[254px] top-8 xl:top-9 lg:left-[-180px]  xl:left-[-258px] pt-4"
        style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
      >
        {sortingProductsFilers.map((item, index) => (
          <div key={item.id} className=" mb-2 ">
            <div
              className={cn(
                "flex justify-between items-center px-4 [&>svg]:fill-blue [&>svg]:hidden [&>svg]:mb-2",
                {
                  "[&>svg]:block":
                    currentFilterValue === item.id.toLocaleLowerCase(),
                },
              )}
            >
              <div
                className={cn(
                  "lg:text-sm xl:text-base text-[#272728] mb-4 mt-2 font-medium cursor-pointer hover:text-blue whitespace-nowrap lg:text-ellipsis lg:overflow-hidden lg:w-[110px] xl:w-[180px] ",
                  {
                    "text-[#272728]":
                      currentFilterValue === item.id.toLocaleLowerCase(),
                  },
                )}
                onClick={() => handleClick(item.id)}
              >
                {item.title}
              </div>
              {getCheckedIconSVG()}
            </div>
            {index < 2 ? (
              <div className=" m-auto  h-[1px] bg-border lg:w-[160px] xl:w-[220px] "></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingItems;
