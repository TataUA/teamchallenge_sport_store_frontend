
// components
import ProductsList from "@/components/ProductsList"

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"

// types
import { IProduct } from "@/services/types"

// helpers
import getSortedProducts from "@/helpers/getSortedProducts"
import getFilteredProducts from "@/helpers/getFilteredProducts"

export const metadata = {
	title: 'Products Page',
	description: 'Products Page with listed products',
}

interface IFilters {
	gender: string, 
	page?: string, 
	sub_category: string, 
	sortedBy?: string
	size?: string
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
	}
}


const getSortedAndFilteredProducts = async (filters: IFilters) => {
	const products: IProduct[] = await fetchProductsAction()

  const filteredProductByCategoryAndGender = products.filter(product => (product.category.sub_category === filters.sub_category) 
	&& (product.category.gender.toLowerCase() === filters.gender.toLowerCase()))

	const sortedProducts = getSortedProducts({products: filteredProductByCategoryAndGender, direction: filters.sortedBy})

	const arraOfFiltersFromFiltersObject = Object.entries(filters).map(([key, value]) => ({ [key]: value }));
	const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})

	return filteredProductsByGeneralFilters
};

export default async function ProductsPage(props: IProductsPageInitialProps) {
	const products = await getSortedAndFilteredProducts(props.searchParams);
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} products={products} />
		</section>
	)
}
