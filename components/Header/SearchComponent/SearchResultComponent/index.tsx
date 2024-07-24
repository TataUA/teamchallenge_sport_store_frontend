import { selectSearch } from "@/redux/search/searchSelector"
import { useSelector } from "react-redux"


const SearchResultComponent = () => {
  const searchResult = useSelector(selectSearch)?.products
	console.log("🚀 ~ SearchForm ~ searchResult:", searchResult)

  return (
    <div>Result</div>
  )
}

export default SearchResultComponent
