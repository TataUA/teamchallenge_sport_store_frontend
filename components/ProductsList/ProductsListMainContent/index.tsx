
// components
import { ClientComponent } from "@/components/ClientComponent"
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
      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl text-[##1A1A1C] font-bold">{translatedProductType}</div>
        <ProductsFilters {...props} />
      </div>
      {Array.isArray(products) && products.length ? (
        <ClientComponent>
          <List products={products} searchParams={searchParams} />
        </ClientComponent>
      ) : null}
      {Array.isArray(products) && !products.length ? (
        <>Empty Array</>
      ) : null}
    </section>
  )
}

export default ProductsListMainContent
