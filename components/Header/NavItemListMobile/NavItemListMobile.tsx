import useHandleClose from '@/hooks/useHandleClose'
import { NavItem } from '@/services/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeftIcon, CloseIcon } from '../../../public/icons/header'
import styles from '../Navbar.module.css'
import { cn } from '@/services/utils/cn'

interface NavItemListProps {
	onClose: () => void
	navItems: NavItem[]
}

export const NavItemListMobile = ({ navItems, onClose }: NavItemListProps) => {
	const [dropdownStates, setDropdownStates] = useState(
		navItems.map(() => false)
	)
	const handleClose = useHandleClose(onClose)

	const handleToggleDropdown = (index: number) => {
		setDropdownStates(prevState => {
			const updatedDropdownStates = prevState.map((state, i) =>
				i === index ? !state : false
			)
			return updatedDropdownStates
		})
	}
	return (
		<>
			{navItems.map((item, index) => (
				<div
					key={item.title.label}
					className='relative min-h-14 flex flex-row justify-between py-3'
					onClick={() => handleToggleDropdown(index)}
				>
					<p className={cn('text-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex [&+svg]:stroke-[#3E3E40]',
						'[&+svg]:hover:stroke-[#0A4CF6] [&+svg]:active:[&+svg]:stroke-[#0A4CF6] hover:text-blue active:text-blue'
					)}>
						<span>
							{item.title.label}
						</span>
					</p>
					<svg
						id={`svg-${item.title.label}`}
						width='24px'
						height='24px'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='svgIcon'
					>
						<path
							d='M9 18L15 12L9 6'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<div
						className={`${styles.dropdown} ${
							dropdownStates[index] ? styles.dropdownActive : ''
						}`}
					>
						<div className='container fixed top-0 left-0 right-0 bottom-0 bg-white z-10'>
							<div className='relative py-3 mb-4 flex items-center gap-2'>
								<a href='#'>
									<button className='flex h-10 mt-1'>
										<Image
											src={ArrowLeftIcon}
											alt='arrow left'
											width={40}
											height={40}
										/>
									</button>
								</a>
								<h3 className='flex h-10 items-center text-subheading font-semibold leading-140'>
									{item.title.label}
								</h3>
								<a href='#' onClick={handleClose} className='ml-auto'>
									<button className='flex h-10'>
										<Image src={CloseIcon} alt='close' width={40} height={40} />
									</button>
								</a>
							</div>

							<ul>
								{item.links.map(link => (
									<li
										key={link.key}
										onClick={() => handleToggleDropdown(index)}
									>
										<Link
											onClick={onClose}
											href={link.href}
											className='relative min-h-14 items-center cursor-pointer flex flex-row justify-between'
										>
											<p className={cn('text-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex [&+svg]:stroke-[#3E3E40]',
												'[&+svg]:hover:stroke-[#0A4CF6] [&+svg]:active:[&+svg]:stroke-[#0A4CF6] hover:text-blue active:text-blue'
											)}>
												<span>
													{link.label}
												</span>
											</p>
											<svg
												id={`svg-${item.title.label}`}
												width='24px'
												height='24px'
												fill='none'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
												className='svgIcon'
											>
												<path
													d='M9 18L15 12L9 6'
													// stroke='#3E3E40'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
