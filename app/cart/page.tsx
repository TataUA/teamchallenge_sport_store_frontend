import Cart from '@/components/Cart'
import { ClientComponent } from '@/components/ClientComponent'

export const metadata = {
	title: 'Cart',
	description: 'Your shopping cart',
}

export default function CartPage() {
	return (
		<section className='container min-h-full flex items-center justify-center'>
			<ClientComponent>
				<Cart />
			</ClientComponent>
		</section>
	)
}
