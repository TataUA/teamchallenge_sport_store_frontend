import { Suspense } from "react";

// components
import List from "../List";
import ProductsFilters from "../ProductsFilters";
import ProductsFiltersXL from "../ProductFiltersXL";

// helpers
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine";

// types
import { IProduct } from "@/services/types";
import { IProductsPageInitialProps } from "@/app/products/[...sub_category]/page";

interface IProductsPageProps extends IProductsPageInitialProps {
  products: IProduct[] | [];
}

const ProductsListMainContent = (props: IProductsPageProps) => {
  const { products, searchParams, params } = props;
  const translatedProductType = getTranslatedSubcategoryFromEnglishToUkraine(
    params.sub_category[0],
  );
  return (
    <section>
      <div className="flex justify-between items-center mb-4 xl:mb-8 min-[2800px]:mb-10">
        <div className="text-3xl  xl:text-[32px] text-[##1A1A1C] font-bold min-[2800px]:text-5xl">
          {translatedProductType}
        </div>
        <div className="xl:hidden">
          <ProductsFilters {...props} />
        </div>
      </div>
      <ProductsFiltersXL {...props} />

      {Array.isArray(products) && products.length ? (
        <Suspense
          key={searchParams.sub_category + "" + searchParams.page}
          fallback={<List products={[]} searchParams={searchParams} />}
        >
          <List products={products} searchParams={searchParams} />
        </Suspense>
      ) : null}
      {Array.isArray(products) && !products.length ? (
        <div className="text-base min-[2800px]:text-3xl">
          <div>Нажаль не має товарів які відповідають вибраним критеріям</div>
          <div>Спробуйте змінити фільтри пошуку</div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductsListMainContent;
