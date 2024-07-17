import { IProduct } from "@/services/types"

interface IProps {
  product: IProduct
}

const ProductById = (props: IProps) => {
  return (
    <div>
      {props.product.description}
    </div>
  )
}

export default ProductById
