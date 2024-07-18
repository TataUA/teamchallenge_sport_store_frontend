
// components
import ProductsList from "@/components/ProductsList"

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"

// types
import { IProduct } from "@/services/types"

// helpers
import getSortedProducts from "@/helpers/getSortedProducts"
import getFilteredProducts from "@/helpers/getFilteredProducts"
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish"

export const metadata = {
	title: 'Products Page',
	description: 'Products Page with listed products',
}

interface IFilters {
	gender: string, 
	page?: string, 
	sub_category: string, 
	sortedBy?: string
	sizes?: string
	price?: string
	color?: string
}

export interface IProductsPageInitialProps {
	params: {sub_category: string[]}
	searchParams: {
		gender: string, 
		page?: string, 
		sub_category: string
		sortedBy?: string;
		sizes?: string;
		color?: string;
	}
}


const getSortedAndFilteredProducts = async (filters: IFilters) => {
	const products: IProduct[] = await fetchProductsAction()
	console.log("🚀 ~ getSortedAndFilteredProducts ~ products:", products)

  // const filteredProductByCategoryAndGender = products.filter(product => 
	// 	(getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category) === filters.sub_category) 
	// && (product.category.gender.toLowerCase() === filters.gender.toLowerCase()))
  // console.log("🚀 ~ getSortedAndFilteredProducts ~ filteredProductByCategoryAndGender:", filteredProductByCategoryAndGender)

	// const sortedProducts = getSortedProducts({products: filteredProductByCategoryAndGender, direction: filters.sortedBy})
	// console.log("🚀 ~ getSortedAndFilteredProducts ~ sortedProducts:", sortedProducts)
	
	// const arraOfFiltersFromFiltersObject = Object.entries(filters).map(([key, value]) => ({ [key]: value }));
	// console.log("🚀 ~ getSortedAndFilteredProducts ~ arraOfFiltersFromFiltersObject:", arraOfFiltersFromFiltersObject)
	// const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})
	// console.log("🚀 ~ getSortedAndFilteredProducts ~ filteredProductsByGeneralFilters:", filteredProductsByGeneralFilters)
	
	return products
};

export default async function ProductsPage(props: IProductsPageInitialProps) {
	const products = await getSortedAndFilteredProducts(props.searchParams);
	console.log("🚀 ~ ProductsPage ~ products:", products)
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} products={products} />
		</section>
	)
}
