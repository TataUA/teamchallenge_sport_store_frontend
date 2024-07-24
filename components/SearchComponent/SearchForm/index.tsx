
import { useState } from 'react'

import SvgComponent from '@/components/SvgComponent/SvgComponent'

import { iconsData } from '@/constants'

import styles from '../Search/Search.module.css'
import searchSubmitAction from '@/app/actions/searchSubmitAction'
import { useDispatch, useSelector } from 'react-redux'
import { sendSearchQueryThunk, setErrorNull, setProductsSearchResult, setSearchQuery } from '@/redux/search/searchSlice'
import { AppDispatch } from '@/redux/store'
import { cn } from '@/services/utils/cn'
import { selectSearch } from '@/redux/search/searchSelector'

interface IProps {
	name: string
}

const SearchForm = (props: IProps) => {
  const {name} = props

	const dispatch: AppDispatch = useDispatch()

	const [searchText, setSearchText] = useState('')
  const {error} = useSelector(selectSearch)

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value?.toLowerCase())
		dispatch(setSearchQuery(event.target.value?.toLowerCase()))
		if(error) {
			dispatch(setErrorNull())
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if(searchText) dispatch(sendSearchQueryThunk(searchText))
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
					className={styles.search_btn}
				>
					{iconsData.map(
						icon =>
							icon.name === name && (
								<button className={cn('inline-block', {
									'pointer-events-none opacity-[25%]': !searchText
								})} key={icon.name}>
									<SvgComponent
										key={icon.name}
										viewBox={icon.viewBox}
										path={icon.path}
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
