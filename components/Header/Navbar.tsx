import Image from 'next/image'
import menuIcon from '../../public/icons/mob-menu.svg'

export const Navbar = () => {
	return (
		<>
			<button className='border-none'>
				<Image src={menuIcon} alt='menu' width={40} height={40} />
			</button>
		</>
	)
}
