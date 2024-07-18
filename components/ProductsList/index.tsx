
// types
import { IProductsPageInitialProps } from '@/app/products/[...sub_category]/page'
import { IProduct } from '@/services/types'

// components
import ProductsListMainContent from './ProductsListMainContent'
import NavigationByCategoryAndGender from './NavigationByCategoryAndGender'

export interface IProductsPageProps extends IProductsPageInitialProps {
	products: IProduct[] | []
}

const ProductsList = (props: IProductsPageProps) => {
  const {products, ...otherProps} = props
  
	return (
		<section className='h-full w-full'>
      <NavigationByCategoryAndGender 
			{...otherProps}
      />
			<div className=''>
				<ProductsListMainContent
				{...props}
				products={products}
			/>
			</div>
		</section>
	)
}

export default ProductsList
