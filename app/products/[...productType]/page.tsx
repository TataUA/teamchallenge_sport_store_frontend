
// components
import ProductsList from "@/components/ProductsList"

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"
import { IProduct } from "@/services/types"
import getTranslatedGenderToUkraine from "@/helpers/getTranslatedGenderToUkraine"

export const metadata = {
	title: 'Products Page',
	description: 'Products Page with listed products',
}

interface IFilters {gender: string, page?: string, productType: string}

export interface IProductsPageInitialProps {
	params: {productType: string[]}
	searchParams: {gender: string, page?: string, productType: string}
}


const getProductsBySubcategory = async (filters: IFilters) => {
	const products: IProduct[] = await fetchProductsAction()

  return  products.filter(product => (product.category.sub_category === filters.productType) 
	&& (getTranslatedGenderToUkraine(product.category.gender) === filters.gender))
};

export default async function ProductsPage(props: IProductsPageInitialProps) {
	const products = await getProductsBySubcategory(props.searchParams);
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} products={products} />
		</section>
	)
}
