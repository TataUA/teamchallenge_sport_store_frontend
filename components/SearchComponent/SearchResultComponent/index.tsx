import { selectSearch } from "@/redux/search/searchSelector"
import { useSelector } from "react-redux"
import ProductCardInfo from "../ProductCardInfo"
import { useRouter } from "next/navigation"
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish"
import { Loader } from "@/components/Loader"

interface IProps {
	onClose?: () => void
}

const SearchResultComponent = (props: IProps) => {
  const {onClose} = props
  const {products: searchResult, loading, error} = useSelector(selectSearch)

  const router = useRouter()

  const handleClickButton = () => {
    if(searchResult) router.push(`/products/${getTranslatedSubcategoryFromUkraineToEnglish(searchResult[0].category.sub_category)}`)
    if(onClose) onClose()
  }

  return (
    <div className="pt-10 h-auto max-h-[90vh] overflow-y-auto">
      {searchResult?.length ? (
        <div>
          <h3 className="mb-5">Товари</h3>
          {searchResult.slice(0,4).map((product) => (
            <ProductCardInfo 
              key={product.id} 
              product={product}
              onClose={onClose} 
            />
          ))}
          <div 
            className="text-center bg-gray-200 py-2 rounded-xl"
            onClick={() => handleClickButton()}
          >
            Всі результати пошуку
          </div>
        </div>
      ) : null}
      {Array.isArray(searchResult) && !searchResult?.length ? (
        <>
          <h3 className="text-center text-sm text-[#868687]">За вашим запитом нічого не знайдено</h3>
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
