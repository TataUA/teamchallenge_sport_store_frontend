import Image from 'next/image'
import Link from 'next/link'
import cartIcon from '../../public/icons/header/cart.svg'
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
			<Link href='/cart'>
				<Image src={cartIcon} alt='cart' width={40} />
			</Link>
		</div>
	)
}
