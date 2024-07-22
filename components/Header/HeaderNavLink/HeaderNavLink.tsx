'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

// data
import { headerNav, iconsData } from '@/constants'


// components
import SvgComponent from '../../SvgComponent/SvgComponent'
import { SearchForm } from '../SearchForm/SearchForm'

// utils
import { cn } from '@/services/utils/cn'

// store
import { selectCart } from '@/redux/cart/cartSelector'

const HeaderNavLink = () => {
	const [isHovered, setIsHovered] = useState('')

	const cart = useSelector(selectCart)

	return (
		<ul className='flex items-center'>
			{headerNav.map(({ href, name }) => (
				<li className='py-2 px-2 h-10' key={name}>
					{name === 'search' ? (
						<SearchForm href={href} name={name} />
					) : (
						<Link
							href={href}
							onMouseEnter={() => setIsHovered(name)}
							onMouseLeave={() => setIsHovered('')}
							onFocus={() => setIsHovered(name)}
						>
							{iconsData.map(
								icon => {
									return icon.name === name && (
										<span key={icon.name}
											className='relative'
										>
											<SvgComponent
												key={icon.name}
												viewBox={icon.viewBox}
												path={icon.path}
												isHovered={isHovered === name}
											/>
												{name === 'cart' && cart.products?.length ? (
													<div 
														className={cn('absolute z-10 bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center',
															'font-semibold text-sm leading-4',
															'top-[-30%] left-[50%] translate-x-[-50%]'
														)}
													>{cart.products?.length}</div>
												) : null}
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
