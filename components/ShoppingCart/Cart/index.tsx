import { useDispatch } from 'react-redux'

// store
import { IProductWithMaxQuantity, removeProductById, setProduct } from '@/redux/cart/cartSlice'

// types
import { IProduct } from '@/services/types'

// components
import ProductItem from './ProductItem'
import CartFooter from './CartFooter'

const Cart = ({ products }: { products: IProductWithMaxQuantity[] }) => {
	const dispatch = useDispatch()

	const handleRemoveProduct = ({id, color, size}: {id: number, color:string, size: string}) => {
		dispatch(removeProductById({id, color, size}))
	}

	const handleIncreaseOrDecreasProduct = (option: string, product: IProductWithMaxQuantity) => {
		if(option ===  'inc' && (product.quantity[0].quantity < product.maxQuantity)) {
			const updatedProductWithIncreasedQuantity = {
			...product,
			quantity: [{...product.quantity[0], quantity: product.quantity[0].quantity + 1}],
		}
		dispatch(setProduct(updatedProductWithIncreasedQuantity))
	}

	if(option ===  'dec') {
		if(product.quantity[0].quantity <= 1) {
			handleRemoveProduct({id: product.id, color: product.colors[0].color.title, size: product.size[0].value})
		} else {
			const updatedProductWithDecreasedQuantity = {
			...product,
			quantity: [{...product.quantity[0], quantity: product.quantity[0].quantity - 1}],
		}
		dispatch(setProduct(updatedProductWithDecreasedQuantity))
		}
		}
	}

	return (
		<div className='min-h-screen flex flex-col'>
			<div className='flex-1 pb-[170px]'>
				<h3 className='text-heading font-bold leading-140 mb-4 text-title'>
					Кошик
					<span className='ml-2 font-semibold text-subheading text-primary'>
						({products.length})
					</span>
				</h3>
				<ul className='h-[100%] overflow-scroll'>
					{products.map((product, index) => (
						<li key={product.id}>
							<ProductItem 
								product={product}
								handleRemoveProduct={handleRemoveProduct}
								handleIncreaseOrDecreasProduct={handleIncreaseOrDecreasProduct}
							/>
							{products?.length-1 === index ? null : (
								<div className='border-t border-border mb-6 mt-6'></div>
							)}
						</li>
					))}
				</ul>
			</div>
			<CartFooter />
		</div>
	)
}

export default Cart
