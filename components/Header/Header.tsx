import { Logo } from '../Logo/Logo'
import { Navbar } from './Navbar'
import { Usernav } from './Usernav'

export const Header = () => {
	return (
		<header className='container py-3 flex justify-between'>
			<div className='flex items-center gap-2'>
				<Navbar />
				<Logo />
			</div>
			<Usernav />
		</header>
	)
}
