// types
import { IProduct } from "@/services/types"

// Components
import NavigationComponent from "./NavigationComponent"
import ProductInfo from "./ProductInfo"

interface IProps {
  product: IProduct
}

const ProductById = (props: IProps) => {
  return (
    <div>
      <NavigationComponent subCategory={props.product.category.sub_category} />
      <ProductInfo {...props} />
    </div>
  )
}

export default ProductById
