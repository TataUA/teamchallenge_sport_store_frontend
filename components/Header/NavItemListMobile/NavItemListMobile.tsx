import useHandleClose from '@/hooks/useHandleClose'
import { NavItem } from '@/services/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeftIcon, CloseIcon } from '../../../public/icons/header'
import styles from '../Navbar.module.css'

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
					className='relative h-fit cursor-pointer flex flex-row justify-between py-3 mb-2 last:mb-0'
					onClick={() => handleToggleDropdown(index)}
				>
					<p>
						<span className='text-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex'>
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
							stroke='#3E3E40'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<div
						className={`${styles.dropdown} ${
							dropdownStates[index] ? styles.dropdownActive : ''
						}`}
					>
						<div className='container fixed top-0 left-0 min-w-full min-h-full bg-white z-10'>
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

							<ul className='mb-4'>
								{item.links.map(link => (
									<li
										key={link.key}
										className='py-3 mb-2 last:mb-0'
										onClick={() => handleToggleDropdown(index)}
									>
										<Link
											onClick={onClose}
											href={link.href}
											className='relative h-fit cursor-pointer flex flex-row justify-between'
										>
											<p>
												<span className='text-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex'>
													{link.label}
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
													stroke='#3E3E40'
													stroke-width='2'
													stroke-linecap='round'
													stroke-linejoin='round'
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
