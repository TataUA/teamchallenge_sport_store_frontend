import extractProductTypeFromParamsAndTranslateUkraine from "@/helpers/extractProductTypeFromParamsAndTranslateUkraine"

interface IProps {
  params: { sub_category: Array<string> },
  searchParams: { gender: string, sub_category: string }
}

const NavigationByCategoryAndGender = (props: IProps) => {
  const {searchParams: {gender}, params:{sub_category}} = props

  const translatedProductType = extractProductTypeFromParamsAndTranslateUkraine(sub_category[0])

  return (
    <div className='flex gap-2 mb-5 text-base font-medium max-[767px]:text-sm min-[2800px]:text-3xl min-[2800px]:mx-10'>
      <span>{gender}</span>
      <span>&gt;</span>
      <span>{translatedProductType}</span>
    </div>
  )
}

export default NavigationByCategoryAndGender
