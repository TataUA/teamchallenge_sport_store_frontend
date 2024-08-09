import Link from "next/link"
import { useSelector } from "react-redux"

// store
import { selectCart } from "@/redux/cart/cartSelector"

// helpers
import { cn } from "@/services/utils/cn"

const CartItem = ({onClose}: {onClose: () => void}) => {

	const cart = useSelector(selectCart)

  return (
    <div className='min-h-14 cursor-pointer py-3'>
			<Link href='/cart' onClick={() => onClose()}>
				<p className='font-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex'>
					<span>
						Кошик
						{cart.products.length ? (
							<span 
								className={cn('relative z-20 bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center',
									'font-semibold text-sm leading-4',
									'left-[110%] top-[-50%] ',
								)}
								>{cart.products.length}</span>
							) : null}
					</span>
				</p>
			</Link>
		</div>
  )
}

export default CartItem
