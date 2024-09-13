import fetchSortedProductsAction from "@/app/actions/fetchSortedProductsAction";

import { IProduct } from "@/services/types";

import getSortedProducts from "@/helpers/getSortedProducts";
import getFilteredProducts from "@/helpers/getFilteredProducts";
import Test from "@/components/ProductsList/Test";

export const metadata = {
  title: "Products Page",
  description: "Products Page with listed products",
};

export interface IFilters {
  page?: string;
  limit?: number;
}

export interface IProductsPageInitialProps {
  params: { sortedBy: string };
  searchParams: IFilters;
}

const getSortedAndFilteredProducts = async ({
  filters,
  sortedBy,
}: {
  filters: IFilters;
  sortedBy: string;
}) => {
  const products: IProduct[] = await fetchSortedProductsAction(
    sortedBy,
    filters.limit || 12,
  );

  const sortedProducts = getSortedProducts({
    products: products,
  });

  const arraOfFiltersFromFiltersObject = Object.entries({
    ...filters,
    sortedBy,
  }).map(([key, value]) => ({ [key]: value }));
  const filteredProductsByGeneralFilters = getFilteredProducts({
    products: sortedProducts,
    filters: arraOfFiltersFromFiltersObject,
  });

  return filteredProductsByGeneralFilters;
};

export default async function SortedProductsPage(
  props: IProductsPageInitialProps,
) {
  const products = await getSortedAndFilteredProducts({
    filters: props.searchParams,
    sortedBy: props.params.sortedBy,
  });
  return (
    <section className="px-6 pt-4 pb-12">
      <Test products={products} />
    </section>
  );
}
