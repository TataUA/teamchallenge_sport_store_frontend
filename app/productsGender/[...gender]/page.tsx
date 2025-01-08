// actions
import fetchProductsByGenderAction from "@/app/actions/fetchProductsByGenderAction";

// types
import { IProduct } from "@/services/types";

// helpers

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

export default async function ProductsByGenderPage(
  props: IProductsPageInitialProps,
) {
  const filters: IFilters = props.searchParams;
  let page: number;
  if (!filters.page) {
    page = 1;
  } else {
    page = Number(filters.page);
  }
  return (
    <section className="px-6 pt-4 pb-12 xl:container">
      {/* <NewTest products={products} count={count} limit={limit} /> */}
      <NewTest gender={props.params.gender[0]} page={page} />
    </section>
  );
  //  }
}
