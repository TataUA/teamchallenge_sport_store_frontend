import extractProductTypeFromParamsAndTranslateUkraine from "@/helpers/extractProductTypeFromParamsAndTranslateUkraine"

interface IProps {
  params: { productType: Array<string> },
  searchParams: { gender: string, productType: string }
}

const NavigationByCategoryAndGender = (props: IProps) => {
  const {searchParams: {gender}, params:{productType}} = props

  const translatedProductType = extractProductTypeFromParamsAndTranslateUkraine(productType[0])

  return (
    <div className='flex gap-2 mb-5 text-base font-medium max-[767px]:text-sm min-[2800px]:text-3xl min-[2800px]:mx-10'>
      <span>{gender}</span>
      <span>&gt;</span>
      <span>{translatedProductType}</span>
    </div>
  )
}

export default NavigationByCategoryAndGender
