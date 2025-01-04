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

const getSortedAndFilteredProducts = async ({
  filters,
  gender,
  limit,
}: {
  filters: IFilters;
  gender: string;
  limit: number;
}) => {
  let offset: number;

  if (filters.page) {
    offset = (Number(filters.page) - 1) * limit;
  } else {
    offset = 0;
  }
  const result = await fetchProductsByGenderAction(gender, limit, offset);
  return result;
};

export default async function ProductsByGenderPage(
  props: IProductsPageInitialProps,
) {
  let limit = 8; // Кількість карток на сторінці
  const resultsFunc = await getSortedAndFilteredProducts({
    filters: props.searchParams,
    gender: props.params.gender[0],
    limit,
  });
  let products: IProduct[];
  if (resultsFunc) {
    products = resultsFunc[0];
    const count = resultsFunc[1];

    return (
      <section className="px-6 pt-4 pb-12 xl:container">
        <NewTest products={products} count={count} limit={limit} />
      </section>
    );
  }
}
