'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'

// data
import { headerNav, iconsData } from '@/constants'


// components
import SvgComponent from '../../SvgComponent/SvgComponent'
import SearchComponent from '../../SearchComponent'

// utils
import { cn } from '@/services/utils/cn'

// store
import { selectCart } from '@/redux/cart/cartSelector'

const HeaderNavLink = () => {
	const cart = useSelector(selectCart)

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
