'use client'
// types
import { IProductsPageInitialProps } from '@/app/products/[...sub_category]/page'
import { IProduct } from '@/services/types'

// components
import ProductsListMainContent from './ProductsListMainContent'
import NavigationByCategoryAndGender from './NavigationByCategoryAndGender'
import getTranslatedSubcategoryFromUkraineToEnglish from '@/helpers/getTranslatedSubcategoryFromUkraineToEnglish'
import getSortedProducts from '@/helpers/getSortedProducts'
import getFilteredProducts from '@/helpers/getFilteredProducts'
import { useEffect } from 'react'

export interface IProductsPageProps extends IProductsPageInitialProps {
	products: IProduct[] | []
}

const ProductsList = (props: IProductsPageProps) => {
  const {products, ...otherProps} = props
	
	useEffect(()=>{
		console.log("🚀 ~ ProductsList ~ products:", products)

		const filters = otherProps.searchParams
		console.log("🚀 ~ ProductsList ~ filters:", filters)
	
		const filteredProductBySubcategory = products.filter(product => 
			(getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category) === filters.sub_category.toLowerCase()))
		console.log("🚀 ~ ProductsList ~ filteredProductBySubcategory:", filteredProductBySubcategory)
	
		const filteredProductByGender = filteredProductBySubcategory.filter(product => 
			(product.category.gender.toLowerCase() === filters.gender.toLowerCase()))
		
		console.log("🚀 ~ ProductsList ~ filteredProductBySubcategory:", filteredProductByGender)
		console.log('---------------------------------------------');
		
		// const sortedProducts = getSortedProducts({products: filteredProductByCategoryAndGender, direction: filters.sortedBy})
		
		// const arraOfFiltersFromFiltersObject = Object.entries(filters).map(([key, value]) => ({ [key]: value }));
		// const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})

	},[otherProps.searchParams, products])

  
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
