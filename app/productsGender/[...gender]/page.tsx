// actions
import fetchProductsByGenderAction from "@/app/actions/fetchProductsByGenderAction";

// types
import { IProduct } from "@/services/types";

// helpers
import getSortedProducts from "@/helpers/getSortedProducts";
import getFilteredProducts from "@/helpers/getFilteredProducts";
import ListItem from "@/components/ProductsList/ListItem";
import Test from "@/components/ProductsList/Test";

export const metadata = {
  title: "Products Page",
  description: "Products Page with listed products",
};

export interface IFilters {
  gender: string;
  page?: string;
  sortedBy?: string;
  sizes?: string;
  price?: string;
  price_from?: string;
  price_to?: string;
  color?: string;
}

export interface IProductsPageInitialProps {
  params: { gender: string[] };
  searchParams: IFilters;
}

const getSortedAndFilteredProducts = async ({
  filters,
  gender,
}: {
  filters: IFilters;
  gender: string;
}) => {
  const products: IProduct[] = await fetchProductsByGenderAction(gender);

  const filteredProductByGender = products.filter((product) => {
    if (filters.gender) {
      return (
        product.category.gender.toLowerCase() === filters.gender?.toLowerCase()
      );
    }
    return product;
  });

  const sortedProducts = getSortedProducts({
    products: filteredProductByGender,
    direction: filters.sortedBy,
  });

  const arraOfFiltersFromFiltersObject = Object.entries({
    ...filters,
    gender,
  }).map(([key, value]) => ({ [key]: value }));
  const filteredProductsByGeneralFilters = getFilteredProducts({
    products: sortedProducts,
    filters: arraOfFiltersFromFiltersObject,
  });

  return filteredProductsByGeneralFilters;
};

export default async function ProductsByGenderPage(
  props: IProductsPageInitialProps,
) {
  const products = await getSortedAndFilteredProducts({
    filters: props.searchParams,
    gender: props.params.gender[0],
  });
  return (
    <section className="px-6 pt-4 pb-12">
      <Test products={products} />
    </section>
  );
}
