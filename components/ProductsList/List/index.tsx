import { useCallback } from "react"

// types
import { IProduct } from "@/services/types"

// components
import ListItem from "../ListItem"
import Pagination from "../Pagination"

interface IProps {
  products: IProduct[]
  searchParams: {gender: string, page?: string, sub_category: string}
}

const List = (props: IProps) => {
  const {products, searchParams} = props
  console.log("🚀 ~ List ~ products:", products)
  const {gender, page} = searchParams

  const currentPage = Number(page) || 1;

const getPaginatedItems = useCallback((items: IProduct[], itemsPerPage: number, currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = items.slice(startIndex, startIndex + itemsPerPage);
    const countPages = items?.length / itemsPerPage
    return {
      paginatedProducts,
      countPages
    }
  }, [])

const itemsPerPage = 8;

const {paginatedProducts, countPages} = getPaginatedItems(products, itemsPerPage, currentPage);
console.log("🚀 ~ List ~ paginatedProducts:", paginatedProducts)

  return (
    <div>
      <ul className="flex flex-wrap gap-2 justify-between mb-5">
        {paginatedProducts.map((product, index) => (
          <ListItem 
            key={product.id} 
            product={product}
          />
          ))}
      </ul>
      {paginatedProducts?.length ? (
        <Pagination
          pageCount={countPages}
          />
        ) : null}
    </div>
  )
}

export default List
