import { Suspense } from "react";

import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine";
import { IProduct } from "@/services/types";
import { IProductsPageInitialProps } from "@/app/products/[...sub_category]/page";
import List from "@/components/ProductsList/List";
import ProductsFilters from "@/components/ProductsList/ProductsFilters";
import ProductsFiltersXL from "@/components/ProductsList/ProductFiltersXL";

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
      <div className="flex justify-between items-center mb-4 lg:mb-8 ">
        <div className="text-3xl lg:text-[32px] text-title font-bold">
          {translatedProductType}
        </div>
        <div className="lg:hidden">
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
        <div className="text-base">
          <div>Нажаль не має товарів які відповідають вибраним критеріям</div>
          <div>Спробуйте змінити фільтри пошуку</div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductsListMainContent;
