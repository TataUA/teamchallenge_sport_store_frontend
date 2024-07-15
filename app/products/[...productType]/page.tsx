
// components
import ProductsList from "@/components/ProductsList"

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"

// types
import { IProduct } from "@/services/types"

// helpers
import getTranslatedGenderToUkraine from "@/helpers/getTranslatedGenderToUkraine"
import getSortedProducts from "@/helpers/getSortedProducts"

export const metadata = {
	title: 'Products Page',
	description: 'Products Page with listed products',
}

interface IFilters {gender: string, page?: string, productType: string, sortedBy?: string}

export interface IProductsPageInitialProps {
	params: {productType: string[]}
	searchParams: {
		gender: string, 
		page?: string, 
		productType: string
		sortedBy?: string;
	}
}


const getProductsBySubcategory = async (filters: IFilters) => {
	const products: IProduct[] = await fetchProductsAction()

  const filteredProductByCategory = products.filter(product => (product.category.sub_category === filters.productType) 
	&& (getTranslatedGenderToUkraine(product.category.gender) === filters.gender))

	return getSortedProducts({products: filteredProductByCategory, direction: filters.sortedBy})
};

export default async function ProductsPage(props: IProductsPageInitialProps) {
	const products = await getProductsBySubcategory(props.searchParams);
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} products={products} />
		</section>
	)
}
