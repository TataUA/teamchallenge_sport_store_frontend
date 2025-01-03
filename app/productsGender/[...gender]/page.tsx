// actions
import fetchProductsByGenderAction from "@/app/actions/fetchProductsByGenderAction";

// types
import { IProduct } from "@/services/types";

// helpers
import getSortedProducts from "@/helpers/getSortedProducts";
import getFilteredProducts from "@/helpers/getFilteredProducts";
import ListItem from "@/components/ProductsList/ListItem";
import NewTest from "@/components/ProductsList/NewTest";

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
  const limit = 8;
  let offset: number;

  if (filters.page) {
    offset = (Number(filters.page) - 1) * limit;
  } else {
    offset = 0;
  }

  const result = await fetchProductsByGenderAction(gender, limit, offset);

  // const filteredProductByGender = products.filter((product) => {
  //   if (filters.gender) {
  //     return (
  //       product.category.gender.toLowerCase() === filters.gender?.toLowerCase()
  //     );
  //   }
  //   return product;
  // });

  // const sortedProducts = getSortedProducts({
  //   products: filteredProductByGender,
  //   direction: filters.sortedBy,
  // });

  // const arraOfFiltersFromFiltersObject = Object.entries({
  //   ...filters,
  //   gender,
  // }).map(([key, value]) => ({ [key]: value }));
  // const filteredProductsByGeneralFilters = getFilteredProducts({
  //   products: sortedProducts,
  //   filters: arraOfFiltersFromFiltersObject,
  // });

  return result;
};

export default async function ProductsByGenderPage(
  props: IProductsPageInitialProps,
) {
  const resultsFunc = await getSortedAndFilteredProducts({
    filters: props.searchParams,
    gender: props.params.gender[0],
  });
  let products: IProduct[];
  if (resultsFunc) {
    products = resultsFunc[0];
    const count = resultsFunc[1];
    // console.log(`Page products - ${products[0].id} / ${products[0].title}`);
    // console.log(`Page count - ${count}`);
    return (
      <section className="px-6 pt-4 pb-12">
        <NewTest products={products} count={count} />
      </section>
    );
  }
}
