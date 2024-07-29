import {  useSelector } from "react-redux"
import { useRouter } from "next/navigation"

// store
import { selectSearch } from "@/redux/search/searchSelector"

// components
import ProductCardInfo from "../ProductCardInfo"
import { Loader } from "@/components/Loader"

// helpers
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish"
import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery"

interface IProps {
	onClose?: () => void
}

const SearchResultComponent = (props: IProps) => {
  const {onClose} = props
  const {products: searchResult, loading, error, query} = useSelector(selectSearch)
  
  const router = useRouter()
  
  const handleClickButton = () => {
    if(searchResult) {
      const otherParams = getCorrectQueryParamsSearchQuery(query)
      const subCategory = getTranslatedSubcategoryFromUkraineToEnglish(searchResult[0].category.sub_category)
      router.push(`/products/${subCategory}?${otherParams}`)
      if(onClose) onClose()
    }
  }

  return (
    <div className="pt-5">
      {searchResult?.length ? (
        <div>
          <h3 className="mb-4 text-[#868687]">Товари</h3>
          {searchResult.slice(0,4).map((product, index) => (
            <ProductCardInfo 
              key={product.id} 
              product={product}
              onClose={onClose} 
              classname={index === 3 ? 'border-b-0' : ''}
            />
          ))}
          <div 
            className="text-base font-semibold text-center text-blue border-blue border-[1px] py-3 rounded-xl hover:text-white hover:bg-blue"
            onClick={() => handleClickButton()}
          >
            Всі результати пошуку
          </div>
        </div>
      ) : null}
      {Array.isArray(searchResult) && !searchResult?.length ? (
        <>
          <h3 className="mt-4 text-center text-sm text-[#868687]">За вашим запитом нічого не знайдено</h3>
        </>
      ) : null}
      {loading ? <Loader /> : null}
      {error ? (
        <>
          <h3 className="text-center text-sm text-[#868687]">Вибачте, помилка під час запиту на сервер.</h3>
        </>
      ) : null}
    </div>
  )
}

export default SearchResultComponent
