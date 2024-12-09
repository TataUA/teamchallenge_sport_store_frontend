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
      sortedString = "Від найдешевшої";
    } else if (id === "descent") {
      sortedString = "Від найдорожчої";
    } else {
      sortedString = "Рекомендовані";
    }
    setIsSortingString(sortedString);
    setIsSortingArrowUp(false);
  };

  return (
    <div className="relative">
      <div
        className="absolute z-10 bg-white border border-border rounded-xl w-[254px] top-9  left-[-258px] pt-4"
        style={{ boxShadow: "0px 10px 10px rgba(14, 14, 16, 0.2)" }}
      >
        {sortingProductsFilers.map((item, index) => (
          <div key={item.id} className=" mb-2 min-[2800px]:mb-8">
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
                  "text-base text-[#272728] mb-4 mt-2 font-medium cursor-pointer hover:text-blue min-[2800px]:text-3xl",
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
              <div className=" m-auto  h-[1px] bg-border w-[220px] "></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingItems;
