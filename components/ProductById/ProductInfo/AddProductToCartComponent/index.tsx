'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

// components
import ResponsiveModal from '@/components/Shared/ResponsiveModal'

// helpers
import getCartSVG from '@/helpers/getCartSVG'
import getCheckedIconSVG from '@/helpers/getCheckedIconSVG'
import { cn } from '@/services/utils/cn'

// redux
import { setProduct } from '@/redux/cart/cartSlice'
import { selectCurrentProduct } from '@/redux/currentProduct/currentProductSelector'
import {
	setCurrentProduct,
	setDefaultCurrentProduct,
	setIsSizeModalOpened,
} from '@/redux/currentProduct/currentProductSlice'

// types
import { IProduct, ProductSize } from '@/services/types'

// data
import { generalProductsFilers } from '@/components/ProductsList/ProductsFilters/filtersData'

const AddProductToCartComponent = ({ product }: { product: IProduct }) => {
	const [isSuccessModalIsOpened, setIsSuccessModalIsOpened] = useState(false)

	const dispatch = useDispatch()
	const router = useRouter()

	const currentProduct = useSelector(selectCurrentProduct)
	const { sizes: sizesStored } = currentProduct

	const isShoesSizes = () => {
		if (sizesStored?.length) {
			const shoesSizes = generalProductsFilers.filter(
				item => item.id === 'sizes'
			)[0].sizesShoes
			return shoesSizes?.includes(sizesStored.toString())
		}
	}

	// Код компонента
	const handleClickCartButton = () => {
		if (!sizesStored?.length) {
			dispatch(setIsSizeModalOpened(true))
			return
		}
		setIsSuccessModalIsOpened(true)
		// Создаем объект размера с выбранным значением
		const selectedProductSize: ProductSize = {
			id: 1, // Возможно, вам нужно получить реальный id размера
			value: sizesStored,
		}
		// Получаем выбранный цвет. Если цвет не выбран, берем первый цвет в массиве colors
		const selectedColor = currentProduct.color || product.colors[0]?.color.title
		// Фильтруем quantity для выбранного размера и цвета
		const filteredQuantities = product.quantity.filter(
			q => q.size === sizesStored && q.color === selectedColor
		)
		// Находим изображение, соответствующее выбранному цвету
		const selectedImage =
			product.colors.find(c => c.color.title === selectedColor)?.image_url ||
			product.colors[0]?.image_url // Добавляем значение по умолчанию, если изображение не найдено

		// Создаем объект продукта с выбранным размером, цветом, отфильтрованным quantity и изображением
		const productWithSelectedSizeAndColor = {
			...product,
			size: [selectedProductSize],
			quantity: filteredQuantities,
			colors: [
				{
					image_url: selectedImage, // Сохраняем изображение выбранного цвета
					color: {
						id:
							product.colors.find(c => c.color.title === selectedColor)?.color
								.id || 0,
						title: selectedColor, // Обновляем title для выбранного цвета
					},
				},
			],
		}
		// Добавляем продукт с выбранным размером, цветом и изображением в корзину
		dispatch(setProduct(productWithSelectedSizeAndColor))
	}

	useEffect(() => {
		dispatch(setDefaultCurrentProduct())
		dispatch(setCurrentProduct(product))
	}, [dispatch, product])

	return (
		<div>
			<div
				className={cn(
					'bg-blue mb-8 w-full text-white py-4 px-10 fill-white cursor-pointer flex justify-center items-center gap-2 rounded-xl',
					'[&>svg]:text-white',
					'hover:opacity-[75%]',
					'lg:max-w-[500px] 2xl:3xl'
				)}
				onClick={() => handleClickCartButton()}
			>
				{getCartSVG()}
				Додати до кошика
			</div>
			<ResponsiveModal
				isOpen={isSuccessModalIsOpened}
				onClose={() => setIsSuccessModalIsOpened(false)}
			>
				<div className='flex gap-3 pt-5 justify-center items-center mb-10'>
					<span className='bg-blue rounded-[50%] [&>svg]:fill-white [&>svg]:text-white'>
						{getCheckedIconSVG()}
					</span>
					<h3 className='text-xl text-[#272728]'>Товар додано в кошик!</h3>
				</div>
				<div className='flex gap-3 mb-8'>
					<div
						className={cn(
							'w-[108px] h-[108px] bg-blue rounded-xl overflow-hidden'
						)}
					>
						<Image
							width={108}
							height={108}
							src={product.colors?.[0]?.image_url}
							alt='photo_product'
						/>
					</div>
					<div className='flex flex-col justify-evenly flex-1'>
						<p>{product.title}</p>
						<div className='flex justify-between'>
							<span className='text-[#868687] text-sm'>
								Розмір: {isShoesSizes() ? `${sizesStored} UA` : sizesStored}
							</span>
							<span className='text-[#1A1A1C] font-semibold text-base'>
								{product.price} грн
							</span>
						</div>
					</div>
				</div>
				<div className='text-center'>
					<div
						onClick={() => setIsSuccessModalIsOpened(false)}
						className={cn(
							'text-[#0A4CF6] rounded-xl border-[1px] border-[#0A4CF6] py-4 px-20 mb-3',
							'hover:text-white hover:bg-[#0A4CF6] cursor-pointer'
						)}
					>
						Продовжити покупки
					</div>
					<Link
						href={'/cart'}
						className={cn(
							'text-white bg-[#0A4CF6] rounded-xl py-4 px-20 mb-3 inline-block w-full',
							'hover:text-[#0A4CF6] hover:bg-white hover:border-[#0A4CF6] border-[1px] cursor-pointer'
						)}
					>
						Перейти в кошик
					</Link>
				</div>
			</ResponsiveModal>
		</div>
	)
}

export default AddProductToCartComponent
