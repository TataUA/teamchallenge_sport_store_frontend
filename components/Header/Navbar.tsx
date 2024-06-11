import Image from 'next/image'
import menuIcon from '../../public/icons/header/mob-menu.svg'
import { Modal } from '../Modal/Modal'
import { NavItemListMobile } from './NavItemListMobile/NavItemListMobile'
import { UsernavMobile } from './UsernavMobile'
import { NAV_ITEMS } from './nav-items.data'

interface NavbarProps {
	isModalOpen: boolean
	setIsModalOpen: (isOpen: boolean) => void
}

export const Navbar = ({ isModalOpen, setIsModalOpen }: NavbarProps) => {
	return (
		<div className='flex items-center justify-center'>
			<button className='border-none' onClick={() => setIsModalOpen(true)}>
				<Image src={menuIcon} alt='menu' width={40} height={40} />
			</button>
			<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className='mb-4'>
					<NavItemListMobile
						navItems={NAV_ITEMS}
						onClose={() => setIsModalOpen(false)}
					/>
				</div>
				<div className='border-t border-border mb-4'></div>
				<UsernavMobile />
			</Modal>
		</div>
	)
}
