// helpers
import { IFilters } from "@/app/products/[...sub_category]/page";
import getTranslatedGenderToUkraine from "@/helpers/getTranslatedGenderToUkraine";
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine";

interface IProps {
  params: { sub_category: Array<string> };
  searchParams: IFilters;
}

const NavigationByCategoryAndGender = (props: IProps) => {
  const {
    searchParams: { gender },
    params: { sub_category },
  } = props;
  const translatedProductType = getTranslatedSubcategoryFromEnglishToUkraine(
    sub_category[0] || "",
  );
  return (
    <div className="flex items-center gap-2 mb-5 text-base font-medium  mt-[60px] xl:mt-2 ">
      {gender ? (
        <>
          <span className="capitalize">
            {getTranslatedGenderToUkraine(gender)}
          </span>
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M6.75 13.5L11.25 9L6.75 4.5"
              stroke="#272728"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      ) : null}
      <span>{translatedProductType}</span>
    </div>
  );
};

export default NavigationByCategoryAndGender;
