
// styles
import styles from './Search.module.css'

// component
import SearchResultComponent from '../SearchResultComponent'
import SearchForm from '../SearchForm'

export interface SearchFormProps {
	isOpen: boolean
	onClose?: () => void
	name: string
}

const Search = (props: SearchFormProps) => {
	const {isOpen} = props

	if(!isOpen) return null

	return (
		<div
			className={`${styles.search_wrapper} ${
				isOpen ? styles.active : ''
			}`}
		>
			<SearchForm {...props}/>
			<SearchResultComponent />
		</div>
	)
}

export default Search
