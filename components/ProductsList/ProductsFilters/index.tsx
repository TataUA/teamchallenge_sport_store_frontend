// conmponents
import SortingFilters from "./SortingFilter";
import GeneralFilters from "./GeneralFilters";
import { ClientComponent } from "@/components/ClientComponent";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

export interface IProductsFiltersProps {
  searchParams: IFilters;
  params: { sub_category: string[] };
  products: IProduct[];
}

const ProductsFilters = (props: IProductsFiltersProps) => {
  return (
    <div className="flex gap-2 min-[2800px]:gap-6 xl:hidden">
      <ClientComponent>
        <SortingFilters />
        <GeneralFilters {...props} />
      </ClientComponent>
    </div>
  );
};

export default ProductsFilters;
