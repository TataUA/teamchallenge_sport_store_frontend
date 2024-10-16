// components
import ProductsList from "@/components/ProductsList";

export const metadata = {
  title: "Products Page",
  description: "Products Page with listed products",
};

export interface IFilters {
  gender: string;
  page?: string;
  sub_category?: string;
  sortedBy?: string;
  sizes?: string;
  price?: string;
  color?: string;
}

export interface IProductsPageInitialProps {
  params: { sub_category: string[] };
  searchParams: IFilters;
}

export default async function ProductsPage(props: IProductsPageInitialProps) {
  return (
    <section className="px-6 pt-4 pb-12">
      <ProductsList {...props} />
    </section>
  );
}
