
// components
import ProductsList from "@/components/ProductsList"

// actions
// import fetchProductsAction from "@/app/actions/fetchProductsAction"

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

export interface IFilters {
	gender: string, 
	page?: string, 
	sub_category?: string, 
	sortedBy?: string
	sizes?: string
	price?: string
	color?: string
}

export interface IProductsPageInitialProps {
	params: {sub_category: string[]}
	searchParams: IFilters
}


// const getSortedAndFilteredProducts = async ({filters, sub_category}:{filters: IFilters, sub_category: string}) => {
// 	try {
//     const result = await fetch("https://api.sporthubsstore.com/products/");
//     if(result.status === 200) {
//       const products: IProduct[] = await result?.json()
// 			const filteredProductBySubcategory = products.filter(product => 
// 					(getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category) === sub_category.toLowerCase()))
			
// 				const filteredProductByGender = filteredProductBySubcategory.filter(product => {
// 					if(filters.gender) {
// 						return (product.category.gender.toLowerCase() === filters.gender?.toLowerCase())
// 					}
// 					return product
// 				})
		
// 			const sortedProducts = getSortedProducts({products: filteredProductByGender, direction: filters.sortedBy})
			
// 			const arraOfFiltersFromFiltersObject = Object.entries({...filters, sub_category }).map(([key, value]) => ({ [key]: value }));
// 			const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})
			
// 			return filteredProductsByGeneralFilters
//     }
//     return [];
//   } catch (error: any) {
//     console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
// 		return []
//   }

// };



export default async function ProductsPage(props: IProductsPageInitialProps) {
	// const products = await getSortedAndFilteredProducts({filters:props.searchParams, sub_category: props.params.sub_category[0]});
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} />
		</section>
	)
}

