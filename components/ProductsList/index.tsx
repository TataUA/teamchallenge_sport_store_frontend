// 'use client'

// types
import { IFilters, IProductsPageInitialProps } from '@/app/products/[...sub_category]/page'
import { IProduct } from '@/services/types'

// components
import ProductsListMainContent from './ProductsListMainContent'
import NavigationByCategoryAndGender from './NavigationByCategoryAndGender'
import getTranslatedSubcategoryFromUkraineToEnglish from '@/helpers/getTranslatedSubcategoryFromUkraineToEnglish'
import getSortedProducts from '@/helpers/getSortedProducts'
import getFilteredProducts from '@/helpers/getFilteredProducts'
import { useEffect, useState } from 'react'

export interface IProductsPageProps extends IProductsPageInitialProps {
	products: IProduct[] | []
}

// const getSortedAndFilteredProducts = async ({filters, sub_category}:{filters: IFilters, sub_category: string}) => {
// 	try {
//     const result = await fetch("https://api.sporthubsstore.com/products/");
//     if(result.status === 200) {
//       const products: IProduct[] = await result?.json()
// 			const filteredProductBySubcategory = products.filter(product => 
// 					(getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category) === sub_category.toLowerCase()))
			
// 				const filteredProductByGender = filteredProductBySubcategory.filter(product => {
// 					if(filters.gender) {
// 						return (product.category.gender.toLowerCase() === filters.gender?.toLowerCase())
// 					}
// 					return product
// 				})
		
// 			const sortedProducts = getSortedProducts({products: filteredProductByGender, direction: filters.sortedBy})
			
// 			const arraOfFiltersFromFiltersObject = Object.entries({...filters, sub_category }).map(([key, value]) => ({ [key]: value }));
// 			const filteredProductsByGeneralFilters = getFilteredProducts({products: sortedProducts, filters: arraOfFiltersFromFiltersObject})
			
// 			return filteredProductsByGeneralFilters
//     }
//     return [];
//   } catch (error: any) {
//     console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
// 		return []
//   }

// };

const ProductsList = (props: IProductsPageProps) => {
  const {products, ...otherProps} = props

	// const [products, setProducts] = useState<IProduct[]>([])
		// const products = await getSortedAndFilteredProducts({filters:props.searchParams, sub_category: props.params.sub_category[0]});

		// useEffect(()=>{
		// 	getSortedAndFilteredProducts({filters:props.searchParams, sub_category: props.params.sub_category[0]})
		// 	.then((data) => {
		// 		console.log("🚀 ~ .then ~ data:", data)
		// 		setProducts([...data])
		// 	}).catch((error) => {console.log('error', error.message);
		// 	})
		// },[props.params.sub_category, props.searchParams])

	return (
		<section className='h-full w-full'>
      <NavigationByCategoryAndGender 
			{...otherProps}
      />
			<div className=''>
				<ProductsListMainContent
				{...props}
				// products={products}
			/>
			</div>
		</section>
	)
}

export default ProductsList
