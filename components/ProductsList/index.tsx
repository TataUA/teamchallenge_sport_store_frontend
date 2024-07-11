
// types
import { IProductsPageProps } from '@/app/products/[...productType]/page'
import { IProduct } from '@/services/types'

// components
import ProductsListMainContent from './ProductsListMainContent'
import NavigationByCategoryAndGender from './NavigationByCategoryAndGender'

// helpers
import extractProductTypeFromParamsAndTranslateUkraine from '@/helpers/extractProductTypeFromParamsAndTranslateUkraine'

interface IProps extends IProductsPageProps {
	products: IProduct[] | []
}

const ProductsList = (props: IProps) => {
  const {params: {productType}, searchParams: {gender, page}, products} = props

  const correctProductType = extractProductTypeFromParamsAndTranslateUkraine(productType[0])
  
	return (
		<section className='h-full w-full'>
      <NavigationByCategoryAndGender 
        productType={correctProductType} 
        gender={gender} 
      />
			<div className=''>
				<ProductsListMainContent page={page} products={products} productType={correctProductType}  />
			</div>
		</section>
	)
}

export default ProductsList
