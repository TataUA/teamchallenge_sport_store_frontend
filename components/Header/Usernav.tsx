import Image from 'next/image'
import basketIcon from '../../public/icons/header/basket.svg'
import searchIcon from '../../public/icons/header/search.svg'
import { ClientComponent } from '../ClientComponent'
import SignInButton from '../SignInButton'

export const Usernav = () => {
	return (
		<div className='flex items-center'>
			<button className='border-none'>
				<Image src={searchIcon} alt='search' width={40} />
			</button>
			<ClientComponent>
				<SignInButton />
			</ClientComponent>
			<button>
				<Image src={basketIcon} alt='basket' width={40} />
			</button>
		</div>
	)
}
