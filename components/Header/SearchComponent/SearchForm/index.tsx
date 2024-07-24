
import { useState } from 'react'

import SvgComponent from '@/components/SvgComponent/SvgComponent'

import { iconsData } from '@/constants'

import styles from '../Search/Search.module.css'
import searchSubmitAction from '@/app/actions/searchSubmitAction'
import { useDispatch } from 'react-redux'
import { setProductsSearchResult } from '@/redux/search/searchSlice'

interface IProps {
	name: string
}

const SearchForm = (props: IProps) => {
  const {name} = props

	const dispatch = useDispatch()

  const [isHovered, setIsHovered] = useState('')
	const [searchText, setSearchText] = useState('')

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value?.toLowerCase())
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = await searchSubmitAction(searchText)
		dispatch(setProductsSearchResult(data))
	}

  return (
    <div>
			<form 
				className='flex rounded-button justify-between bg-bgSearch px-4 py-3' 
				onSubmit={handleSubmit}
			>
				<input 
					type='text' 
					placeholder='Пошук' 
					className={styles.search_text} 
					value={searchText}
					onChange={(e) => handleChangeInput(e)}
				/>
				<div
					onMouseEnter={() => setIsHovered(name)}
					onMouseLeave={() => setIsHovered('')}
					onFocus={() => setIsHovered(name)}
					className={styles.search_btn}
				>
					{iconsData.map(
						icon =>
							icon.name === name && (
								<button className='inline-block' key={icon.name}>
									<SvgComponent
										key={icon.name}
										viewBox={icon.viewBox}
										path={icon.path}
										isHovered={isHovered === name}
									/>
								</button>
							)
					)}
				</div>
			</form>
		</div>
  )
}

export default SearchForm
