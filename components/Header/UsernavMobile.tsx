import Link from 'next/link'
import { ClientComponent } from '../ClientComponent'

export const UsernavMobile = () => {
	return (
		<>
			<div className='cursor-pointer py-3 mb-2 last:mb-0'>
				<ClientComponent>
					<Link href='/profile'>
						<p className='font-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex'>
							Мій профіль
						</p>
					</Link>
				</ClientComponent>
			</div>
			<div className='cursor-pointer py-3'>
				<Link href='/cart'>
					<p className='font-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex'>
						Корзина
					</p>
				</Link>
			</div>
		</>
	)
}
