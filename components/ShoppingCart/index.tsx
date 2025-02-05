'use client'

import { useSelector } from 'react-redux'

// store
import { selectCart } from '@/redux/cart/cartSelector'

// component
import Cart from './Cart'
import EmptyCart from './EmptyCart'

const ShoppingCart = () => {
	const cart = useSelector(selectCart)

	if (!cart.products?.length) return <EmptyCart />

	return (
		<div className='w-full flex flex-col flex-1'>
			<Cart products={cart.products} />
		</div>
	)
}

export default ShoppingCart
