import { removeProductById } from '@/redux/cart/cartSlice'
import { IProduct } from '@/services/types'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import ButtonSvg from '../Button/ButtonSvg'
import styles from './ProductCart.module.css'

const ProductCart = ({ products }: { products: IProduct[] }) => {
	const dispatch = useDispatch()

	const handleRemoveProduct = (id: number) => {
		dispatch(removeProductById(id))
	}
	return (
		<div className='min-h-screen'>
			<h3 className='text-heading font-bold leading-140 mb-4 text-title'>
				Кошик
				<span className='ml-2 font-semibold text-subheading text-primary'>
					({products.length})
				</span>
			</h3>
			<ul>
				{products.map(product => (
					<li key={product.id}>
						<div className='flex'>
							<div className={styles.item__imgWrapper}>
								<Image
									src={product.colors?.[0]?.image_url}
									alt={product.title}
									fill
									className={styles.item__img}
								/>
							</div>
							<div className='ml-2 py-1 w-[225px]'>
								<div className='flex items-start justify-between mb-3'>
									<h3 className='text-primary font-medium text-basic font-pangram'>
										{product.title}
									</h3>
									<ButtonSvg
										type='button'
										nameSvg='delete'
										fill='#3E3E40'
										fillHovered='#868687'
										onClick={() => handleRemoveProduct(product.id)}
									/>
								</div>

								<p className='text-label mb-[42px]'>
									Розмір: {product.size?.[0]?.value} UA
								</p>
								<div className='flex justify-between items-center'>
									{/* counter */}
									<div className='flex gap-2 items-center'>
										<ButtonSvg
											type='button'
											nameSvg='minus'
											stroke='#3E3E40'
											strokeHovered='#868687'
											className={styles.product__btn}
										/>
										<span className={styles.product__quantity}>{1}</span>
										<ButtonSvg
											type='button'
											nameSvg='plus'
											stroke='#3E3E40'
											strokeHovered='#868687'
											className={styles.product__btn}
										/>
									</div>

									<p className='text-title font-semibold text-button'>
										{product.price} грн
									</p>
								</div>
							</div>
						</div>

						<div className='border-t border-border mb-6 mt-6'></div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductCart
