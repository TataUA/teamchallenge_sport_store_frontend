// helpers
import { IFilters } from "@/app/products/[...sub_category]/page"
import getTranslatedGenderToUkraine from "@/helpers/getTranslatedGenderToUkraine"
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine"

interface IProps {
  params: { sub_category: Array<string> },
  searchParams: IFilters
}

const NavigationByCategoryAndGender = (props: IProps) => {
  console.log('-2');
  const {searchParams: {gender}, params:{sub_category}} = props
console.log('-2');
  const translatedProductType = getTranslatedSubcategoryFromEnglishToUkraine(sub_category[0])
console.log('-2');
  return (
    <div className='flex gap-2 mb-5 text-base font-medium max-[767px]:text-sm min-[2800px]:text-4xl min-[2800px]:mb-10'>
      <span className="capitalize">{getTranslatedGenderToUkraine(gender)}</span>
      <span>&gt;</span>
      <span>{translatedProductType}</span>
    </div>
  )
}

export default NavigationByCategoryAndGender
