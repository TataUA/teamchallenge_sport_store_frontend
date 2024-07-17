// conmponents
import SortingFilters from "./SortingFilter"
import GeneralFilters from "./GeneralFilters"
import { ClientComponent } from "@/components/ClientComponent";

// typess
import { IProduct } from "@/services/types";

export interface IProductsFiltersProps {
  searchParams: {
    gender: string;
    sub_category: string;
    page?: string;
    sortedBy?: string;
  }
  params: {sub_category: string[]}
  products: IProduct[]
}

const ProductsFilters = (props: IProductsFiltersProps) => {

  return (
  <div className="flex gap-2 min-[2800px]:gap-6">
    <SortingFilters />
    <ClientComponent>
      <GeneralFilters {...props} />
    </ClientComponent>
      </div>
  )
}

export default ProductsFilters
