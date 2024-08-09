'use client'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// data
import { headerNav, iconsData } from '@/constants'

// components
import SvgComponent from '../../SvgComponent/SvgComponent'
import SearchComponent from '../../SearchComponent'

// utils
import { cn } from '@/services/utils/cn'

// store
import { selectCart } from '@/redux/cart/cartSelector'
import { AppDispatch } from '@/redux/store'
import { cleanCart, IProductWithMaxQuantity, saveCartIdFromDb, setProduct } from '@/redux/cart/cartSlice'
import { selectUserData } from '@/redux/auth/authSelector'

// helpers
import getBasketIdFromLocalStorage, { setBasketIdToLocalStorage } from '@/helpers/getBasketIdFromLocalStorage'

// api
import { getTokenFromLocalStorage } from '@/services/api'

// actions
import createShoppingCartAction from '@/app/actions/createShoppingCartInDbAction'
import fetchShoppingCartFromServerAction, { ICartResponseItem } from '@/app/actions/fetchShoppingCartFromServerAction'
import fetchProductByIdClientAction from '@/app/actions/fetchProductByIdClientAction'
import addProductToCartInDbAction from '@/app/actions/addProductToCartInDbAction'

// types
import { IProduct } from '@/services/types'

const HeaderNavLink = () => {
	const cart = useSelector(selectCart)
	const user = useSelector(selectUserData)

	const mounted = useRef(false)

	const dispatch: AppDispatch = useDispatch()

	const pathname = usePathname()
	
	useEffect(()  => {
		const token = getTokenFromLocalStorage();

		const saveProductsFromStoreToCartDb = (id: string, product: IProductWithMaxQuantity) => {
			return addProductToCartInDbAction(id, product)
		}

		const fetchProductByIdAndSave = async (item: ICartResponseItem) => {
			const productData: IProduct = await fetchProductByIdClientAction(item.product, item.color, item.size)

			const colors = productData.colors.filter(colorItem => colorItem.color.id === item.color)
			const size = productData.size.filter(sizeItem => sizeItem.id === item.size)
			const filteredQuantities = [...productData.quantity].filter(
				q => q.size === size[0]?.value && q.color.toLowerCase() === colors[0]?.color.title.toLowerCase()
			)

			const updatedProduct = {
				...productData,
				colors,
				size,
				quantity: [{
					size: size[0]?.value,
					color: colors[0]?.color.title,
					quantity: item.quantity
				}],
				maxQuantity: filteredQuantities[0].quantity,
				idInBasketInDb: item.id,
			}
			dispatch(setProduct(updatedProduct))
		}

		const createCartInDb = async () => {
			// якщо створюємо нову то ми отримаємо її ІД і можемо привязати його до юзера
			const {basketId} = await createShoppingCartAction()
			if(basketId) {
				dispatch(saveCartIdFromDb(basketId))
				setBasketIdToLocalStorage(basketId)
				
				fetchCartFromDb(basketId)

				// тут можливо треба продукти с редакса зберегти в корзину в БД
				cart.products.forEach(async product => {
					const response = await saveProductsFromStoreToCartDb(basketId, product)
					if(response?.id) dispatch(setProduct(
						{...product, idInBasketInDb: response?.id}
					))
				})
			}
		}

		const fetchCartFromDb = async (idCart: string) => {
			const response = await fetchShoppingCartFromServerAction(idCart)
			
			if(response?.items.length) {
				response?.items.forEach(async (item) => {
					fetchProductByIdAndSave(item)
				})
			} else {
				dispatch(cleanCart())
			}
		}

		// взаємодія з сервером і корзино в БД тіфльки для авторизованих юзерів
		// для неавторизованих кошик тільки в Local Storage
		if(token) {
			// має бути перевірка чи має юзер корзину
			// const idCart = '462a7df0-9d55-4c58-958b-9239ad174099';
			const basketIdLocalStorage = getBasketIdFromLocalStorage()

			if(basketIdLocalStorage) {
				if(!cart.id) dispatch(saveCartIdFromDb(basketIdLocalStorage))
				fetchCartFromDb(basketIdLocalStorage)
			} else {
				// корзини немає і створюємо її
				createCartInDb()
			}
		}

			mounted.current = true
	},[user?.id, pathname])

	return (
		<ul className='flex items-center'>
			{headerNav.map(({ href, name }) => (
				<li className='py-2 px-2 h-10' key={name}>
					{name === 'search' ? (
						<SearchComponent />
					) : (
						<Link
							href={href}
						>
							{iconsData.map(
								icon => {
									return icon.name === name && (
										<span key={icon.name}
											className='[&>svg]:hover:opacity-[50%] cursor-pointer'
										>
											{name === 'cart' && cart.products?.length ? (
												<div 
													className={cn('relative z-20 bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center',
														'font-semibold text-sm leading-4',
														'left-[50%] top-[-25%] ',
													)}
												>{cart.products?.length}</div>
											) : null}
											<SvgComponent
												key={icon.name}
												viewBox={icon.viewBox}
												path={icon.path}
												classname={cn('',{
													'relative z-10 top-[-18px]': name === 'cart' && cart.products?.length
												})}
											/>
										</span>
									)
								}
							)}
						</Link>
					)}
				</li>
			))}
		</ul>
	)
}

export default HeaderNavLink
