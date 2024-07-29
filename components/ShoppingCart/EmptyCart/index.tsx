import Link from 'next/link'
import Image from 'next/image'

import cartImg from '@/public/icons/cart/cart-img.png'

const EmptyCart = () => (
	<div className='flex flex-col items-center justify-center gap-12'>
		<div className='flex flex-col items-center justify-center'>
			<Image
				src={cartImg}
				alt='cart'
				width={152}
				height={175}
				className='mb-6'
			/>
			<h1 className='text-heading font-bold text-title mb-2'>
				Ваш кошик порожній
			</h1>
			<p className='text-basic font-medium text-title'>
				Але його легко заповнити :)
			</p>
		</div>
		<Link 
			href='/' 
			className='flex items-center justify-center rounded-button py-3 bg-blue cursor-pointer w-full max-w-[342px] text-button font-semibold text-white'>
			За покупками
		</Link>
	</div>
)

export default EmptyCart
