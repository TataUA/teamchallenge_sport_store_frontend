// conmponents
import SortingFilter from "./SortingFilter"
import GeneralFilters from "./GeneralFilters"

export interface IProductsFiltersProps {
  searchParams: {
    gender: string;
    sub_category: string;
    page?: string;
    sortedBy?: string;
  }
  params: {sub_category: string[]}
}

const ProductsFilters = (props: IProductsFiltersProps) => {

  return (
  <div className="flex gap-2">
    <SortingFilter />
    <GeneralFilters {...props} />
      </div>
  )
}

export default ProductsFilters
