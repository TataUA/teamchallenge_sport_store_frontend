// conmponents
import SortingFilter from "./SortingFilter"
import GeneralFilter from "./GeneralFilters"

export interface IProductsFiltersProps {
  searchParams: {
    gender: string;
    productType: string;
    page?: string;
    sortedBy?: string;
}
}

const ProductsFilters = (props: IProductsFiltersProps) => {

  return (
  <div className="flex gap-2">
    <SortingFilter />
    <GeneralFilter {...props} />
      </div>
  )
}

export default ProductsFilters
