import React from 'react'

import ShoppingCart from '@/components/ShoppingCart'
import { ClientComponent } from '@/components/ClientComponent'
import { Loader } from '@/components/Loader'

export const metadata = {
	title: 'Cart',
	description: 'Your shopping cart',
}

export default async function CartPage() {
	return (
		<section className='container min-h-full flex items-center justify-center'>
			<React.Suspense fallback={<Loader />}>
				<ClientComponent>
					<ShoppingCart />
				</ClientComponent>
			</React.Suspense>
		</section>
	)
}
