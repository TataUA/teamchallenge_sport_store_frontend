// helpers
import getTranslatedGenderToUkraine from "@/helpers/getTranslatedGenderToUkraine"
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine"

interface IProps {
  params: { sub_category: Array<string> },
  searchParams: { gender: string, sub_category: string }
}

const NavigationByCategoryAndGender = (props: IProps) => {
  const {searchParams: {gender}, params:{sub_category}} = props

  const translatedProductType = getTranslatedSubcategoryFromEnglishToUkraine(sub_category[0])

  return (
    <div className='flex gap-2 mb-5 text-base font-medium max-[767px]:text-sm min-[2800px]:text-4xl min-[2800px]:mb-10'>
      <span className="capitalize">{getTranslatedGenderToUkraine(gender)}</span>
      <span>&gt;</span>
      <span>{translatedProductType}</span>
    </div>
  )
}

export default NavigationByCategoryAndGender
