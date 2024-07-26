'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// store
import { selectCart } from '@/redux/cart/cartSelector'

// component
import EmptyCart from '../EmptyCart'
import ProductCart from '../ProductCart/ProductCart'

const Cart = () => {
	const cart = useSelector(selectCart)

	useEffect(() => {
		console.log('🚀 ~ Cart ~ cart:', cart.products)
	}, [cart])

	if (!cart.products?.length) return <EmptyCart />

	return (
		<div>
			<ProductCart products={cart.products} />
		</div>
	)
}

export default Cart
