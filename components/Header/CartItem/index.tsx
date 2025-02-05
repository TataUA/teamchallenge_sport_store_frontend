import { useSelector } from "react-redux"

import { selectCart } from "@/redux/cart/cartSelector"

// helpers
import { cn } from "@/services/utils/cn"

// hooks
import useCart from "@/hooks/useCart"

const CartItem = ({onClose}: {onClose: () => void}) => {
	const [isOpened, handleClick] = useCart()

	const cart = useSelector(selectCart);

  return (
    <div className="min-h-14 py-3">
      <div onClick={() => handleClick(!cart.isOpened)}>
        <p className="font-button cursor-pointer text-primary font-medium line-height-150 tracking-wide-04 flex hover:text-blue active:text-blue">
          <span>
            Кошик
            {cart.products.length ? (
              <span
                className={cn(
                  "relative z-[1] bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center",
                  "font-semibold text-sm leading-4",
                  "left-[110%] top-[-50%] ",
                )}
              >
                {cart.products.length}
              </span>
            ) : null}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CartItem
