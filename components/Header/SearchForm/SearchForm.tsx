import SvgComponent from '@/components/svgComponent/SvgComponent'
import { iconsData } from '@/constants'
import Link from 'next/link'
import { useState } from 'react'
import styles from './SearchForm.module.css'

interface SearchFormProps {
	href: string
	name: string
}

export const SearchForm = ({ href, name }: SearchFormProps) => {
	const [isSearchVisible, setIsSearchVisible] = useState(false)
	const [isHovered, setIsHovered] = useState('')

	const handleBtnClick = (): void => {
		setIsSearchVisible(!isSearchVisible)
	}
	return (
		<div
			className={`${styles.search_wrapper} ${
				isSearchVisible ? styles.active : ''
			}`}
		>
			<div className={`${styles.search_box} `}>
				<input type='text' placeholder='Пошук' className={styles.search_text} />
				<Link
					href={href}
					onMouseEnter={() => setIsHovered(name)}
					onMouseLeave={() => setIsHovered('')}
					onFocus={() => setIsHovered(name)}
					className={styles.search_btn}
					onClick={handleBtnClick}
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
			</div>
		</div>
	)
}
