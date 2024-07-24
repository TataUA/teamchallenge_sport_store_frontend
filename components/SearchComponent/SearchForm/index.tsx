
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

// components
import SvgComponent from '@/components/SvgComponent/SvgComponent'

// data
import { iconsData } from '@/constants'

// styles
import styles from '../Search/Search.module.css'

// store
import { selectSearch } from '@/redux/search/searchSelector'
import { sendSearchQueryThunk, setErrorNull, setSearchResultProducts, setSearchQuery } from '@/redux/search/searchSlice'

// utils
import { cn } from '@/services/utils/cn'

interface IProps {
	name: string
}

const SearchForm = (props: IProps) => {
  const {name} = props

	const dispatch: AppDispatch = useDispatch()

  const {error, query} = useSelector(selectSearch)
	const [searchText, setSearchText] = useState(query)

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value?.toLowerCase())
		if(error) {
			dispatch(setErrorNull())
		}
	}
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if(searchText) dispatch(sendSearchQueryThunk(searchText))
	}
	const handleClickResetButton = () => {
		if(searchText) setSearchText('')
			dispatch(setSearchResultProducts(null))
	}
	
	useEffect(()=>{
		dispatch(setSearchQuery(searchText))
	},[dispatch, searchText])

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
			<div 
				className='flex w-full justify-end text-sm text-[#868687] pt-3 cursor-pointer hover:underline'
			>
				<span onClick={handleClickResetButton}>
					Очистити результат і запит
				</span>
			</div>
		</div>
  )
}

export default SearchForm
