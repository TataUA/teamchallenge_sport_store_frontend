// components
import ProductById from "@/components/ProductById";

export const metadata = {
  title: "Product by id Page",
  description: "Info about product by id",
};

export interface IProductsPageInitialProps {
  params: { product_id: string[] };
  searchParams?: {
    gender: string;
    page?: string;
    sub_category: string;
    sortedBy?: string;
    size?: string;
    color?: string;
  };
}

export default async function ProductsPage(props: IProductsPageInitialProps) {
  return (
    <section className="px-6 1440:px-[82px] pt-4 1440:pt-6 pb-8 1440:pb-16">
      <ProductById id={props.params.product_id[0]} />
    </section>
  );
}
