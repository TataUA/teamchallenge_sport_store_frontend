// helpers
import getSortingIconSVG18 from "@/helpers/getSortingIconSVG18";
import getCloseIconSVG18 from "@/helpers/getCloseIconSVG18";

// typess

import { IFilters } from "@/app/products/[...sub_category]/page";
import {
  sortingProductsFilers,
  generalProductsFilers,
} from "../../filtersData";

export interface IProductsFiltersProps {
  searchParams: IFilters;
}

const ShowSetsFiltersXL = (props: IProductsFiltersProps) => {
  const { searchParams } = props;

  const classItemFilter =
    "h-9 rounded-lg bg-border_button flex items-center pl-4";
  const classItemFilterText = "inline-block text-[14px] leading-5 font-medium";
  const classItemFilterIconClose = "ml-2 mr-3  p-1 hover:bg-white";

  let colorString = "Всі кольори";
  if (searchParams.color === "white") {
    colorString = "Білий";
  } else if (searchParams.color === "black") {
    colorString = "Чорний";
  } else if (searchParams.color === "blue") {
    colorString = "Синій";
  } else {
    colorString = "Кольорові";
  }

  let sortedString = "Рекомендовані";
  if (searchParams.sortedBy === "ascent") {
    sortedString = "Від меншої до більшої ціни";
  } else if (searchParams.sortedBy === "descent") {
    sortedString = "Від більшої до меншої ціни";
  }

  return (
    <div className="font-pangram hidden xl:flex items-center mb-5 w-[100%] h-[64px] bg-[#f7f7f7] rounded-xl px-6">
      <div className="flex justify-between w-[100%]">
        <div className="flex items-center">
          <p className="font-semibold text-xl text-title pr-8">Фільтр</p>
          <div className="flex justify-start">
            <ul className="flex justify-start space-x-2">
              <li className={classItemFilter}>
                <div className="pr-3">{getSortingIconSVG18()}</div>
                <div className={classItemFilterText}>{sortedString}</div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>
                  {searchParams.price_from
                    ? `${searchParams.price_from} грн  - ${searchParams.price_to} грн`
                    : "весь діапазон цін"}
                </div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                {searchParams.color ? (
                  <>
                    {" "}
                    <div className="rounded-full h-[18px] w-[18px] bg-white bor border border-[#b7b7b8] mr-3"></div>
                    <div className={classItemFilterText}>{colorString}</div>
                  </>
                ) : (
                  <div className={classItemFilterText}>Всі кольори</div>
                )}

                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
              <li className={classItemFilter}>
                <div className={classItemFilterText}>
                  {searchParams.sizes ? (
                    searchParams.sizes
                  ) : (
                    <div className={classItemFilterText}>Всі розміри</div>
                  )}
                </div>
                <div className={classItemFilterIconClose}>
                  {getCloseIconSVG18()}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex  items-center text-sm font-semibold text-[#3E3E40] hover:underline ">
          Змінити
        </div>
      </div>
    </div>
  );
};

export default ShowSetsFiltersXL;
