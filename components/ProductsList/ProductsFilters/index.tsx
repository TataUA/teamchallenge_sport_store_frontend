// conmponents
import SortingFilters from "./SortingFilter"
import GeneralFilters from "./GeneralFilters"
import { ClientComponent } from "@/components/ClientComponent";

// typess
import { IProduct } from "@/services/types";
import { IProductsPageInitialProps } from "@/app/product/[...product_id]/page";
import { IFilters } from "@/app/products/[...sub_category]/page";

export interface IProductsFiltersProps {
  searchParams: IFilters
  params: {sub_category: string[]}
  products: IProduct[]
}

const ProductsFilters = (props: IProductsFiltersProps) => {
  console.log('-11');

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
