
// components
import ProductsList from "@/components/ProductsList"

// actions
import fetchProductsAction from "@/app/actions/fetchProductsAction"

export const metadata = {
	title: 'Products Page',
	description: 'Products Page with listed products',
}

export interface IProductsPageProps {
	params: {productType: string}
	searchParams: {gender: string, page: string}
}


const getProducts = async () => {
	const products = await fetchProductsAction()

  return  products
};

export default async function ProductsPage(props: IProductsPageProps) {
	const products = await getProducts();
	return (
		<section className='px-6 pt-4 pb-12'>
				<ProductsList {...props} products={products} />
		</section>
	)
}
