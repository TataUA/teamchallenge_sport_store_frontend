// types
import { IFilters, IProductsPageInitialProps } from '@/app/products/[...sub_category]/page'
import { IProduct } from '@/services/types'

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"

// helpers
import getSortedProducts from "@/helpers/getSortedProducts"
import getFilteredProducts from "@/helpers/getFilteredProducts"
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish"
import getTranslatedSubcategoryFromEnglishToUkraine from "@/helpers/getTranslatedSubcategoryFromEnglishToUkraine"
import NavigationByCategoryAndGender from './NavigationByCategoryAndGender'
import ProductsListMainContent from './ProductsListMainContent'

const getSortedAndFilteredProducts = async ({filters, sub_category}:{filters: IFilters, sub_category: string}) => {
	const products: IProduct[] = await fetchProductsAction(getTranslatedSubcategoryFromEnglishToUkraine(sub_category))
	const filteredProductBySubcategory = products.filter(product => 
			(getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category) === sub_category.toLowerCase()))
	
		const filteredProductByGender = filteredProductBySubcategory.filter(product => {
			if(filters.gender) {
				return (product.category.gender.toLowerCase() === filters.gender?.toLowerCase())
			}
			return product
		})

	const sortedProducts = getSortedProducts({products: filteredProductByGender, direction: filters.sortedBy})
	
	const arraOfFiltersFromFiltersObject = Object.entries({...filters, sub_category }).map(([key, value]) => ({ [key]: value }));
	const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})
	
	return filteredProductsByGeneralFilters
};

const ProductsList = async (props: IProductsPageInitialProps) => {
	const products = await getSortedAndFilteredProducts({filters:props.searchParams, sub_category: props.params.sub_category[0]});

	const propsToPass = {...props, products}

	return (
		<section className='h-full w-full'>
      <NavigationByCategoryAndGender 
			{...propsToPass}
      />
			<div className=''>
				<ProductsListMainContent
				{...propsToPass}
			/>
			</div>
		</section>
	)
}

export default ProductsList
