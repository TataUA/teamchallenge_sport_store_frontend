'use client'

import { ClientComponent } from '../ClientComponent'
import HeaderNavLink from './HeaderNavLink/HeaderNavLink'

export const Usernav = () => {
	return (
		<div className='flex items-center'>
			<ClientComponent>
				<HeaderNavLink />
			</ClientComponent>
		</div>
	)
}
