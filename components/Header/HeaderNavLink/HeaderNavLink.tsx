'use client'
import { headerNav, iconsData } from '@/constants'
import Link from 'next/link'
import { useState } from 'react'
import SvgComponent from '../../SvgComponent/SvgComponent'
import { SearchForm } from '../SearchForm/SearchForm'

const HeaderNavLink = () => {
	const [isHovered, setIsHovered] = useState('')

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
								icon =>
									icon.name === name && (
										<SvgComponent
											key={icon.name}
											viewBox={icon.viewBox}
											path={icon.path}
											isHovered={isHovered === name}
										/>
									)
							)}
						</Link>
					)}
				</li>
			))}
		</ul>
	)
}

export default HeaderNavLink
