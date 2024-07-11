
interface IProps {
  gender: string
  productType: string
}

const NavigationByCategoryAndGender = (props: IProps) => {
  const {gender, productType} = props

  return (
    <div className='flex gap-2 mb-5 text-base font-medium max-[767px]:text-sm min-[2800px]:text-3xl min-[2800px]:mx-10'>
      <span>{gender}</span>
      <span>&gt;</span>
      <span>{productType}</span>
    </div>
  )
}

export default NavigationByCategoryAndGender
