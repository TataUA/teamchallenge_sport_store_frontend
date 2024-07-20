'use client'

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
	console.log('-3');
  const {products, ...otherProps} = props
  console.log('-4');
	return (
		<section className='h-full w-full'>
      <NavigationByCategoryAndGender 
			{...otherProps}
      />
			<div className=''>
				<ProductsListMainContent
				{...props}
			/>
			</div>
		</section>
	)
}

export default ProductsList
