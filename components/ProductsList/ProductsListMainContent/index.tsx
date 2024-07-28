
// components
import List from "../List"
import ProductsFilters from "../ProductsFilters"

// types
import { IProductsPageProps } from ".."

// helpers
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine"

const ProductsListMainContent = (props: IProductsPageProps) => {
  const {products, searchParams, params} = props
  const translatedProductType = getTranslatedSubcategoryFromEnglishToUkraine(params.sub_category[0])
  return (
    <section>
      <div className="flex justify-between items-center mb-4 min-[2800px]:mb-10">
        <div className="text-3xl text-[##1A1A1C] font-bold min-[2800px]:text-5xl">
          {translatedProductType}
        </div>
        <ProductsFilters {...props} />
      </div>
      {Array.isArray(products) && products.length ? (
          <List products={products} searchParams={searchParams} />
      ) : null}
      {Array.isArray(products) && !products.length ? (
        <div className="text-base min-[2800px]:text-3xl">
          <div>Нажаль не має товарів які відповідають вибраним критеріям</div>
          <div>Спробуйте змінити фільтри пошуку</div>
        </div>
      ) : null}
    </section>
  )
}

export default ProductsListMainContent
