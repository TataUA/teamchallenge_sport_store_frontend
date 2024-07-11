
// components
import { ClientComponent } from "@/components/ClientComponent"
import List from "../List"

// types
import { IProduct } from "@/services/types"


interface IProps {
  productType: string
  page?: string
  products: IProduct[]
  searchParams: {gender: string, page: string}
}

const ProductsListMainContent = (props: IProps) => {
  const {productType, products, searchParams} = props

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl text-[##1A1A1C] font-bold">{productType}</div>
        <div>Filters</div>
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
