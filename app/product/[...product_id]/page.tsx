
// components
import ProductById from "@/components/ProductById"

// actions
import fetchProductByIdAction from "@/app/actions/fetchProductByIdAction"

export const metadata = {
	title: 'Product by id Page',
	description: 'Info about product by id',
}


export interface IProductsPageInitialProps {
	params: {product_id: string[]}
	searchParams?: {
		gender: string, 
		page?: string, 
		sub_category: string
		sortedBy?: string;
		size?: string;
		color?: string;
	}
}


const getProductById = async (product_id: string) => {
	return await fetchProductByIdAction(product_id)
};

export default async function ProductsPage(props: IProductsPageInitialProps) {
	const product = await getProductById(props.params.product_id[0]);
	return (
		<section className='px-6 pt-4 pb-12'>
			<ProductById product={product} />
		</section>
	)
}
