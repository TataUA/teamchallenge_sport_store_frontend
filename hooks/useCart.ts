'use client'

import { selectCart } from "@/redux/cart/cartSelector";
import { setIsOpened } from "@/redux/cart/cartSlice";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCart = (): [boolean, (isOpened: boolean)=>void] => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const pathname = usePathname();

  const prevPage = useRef<string>(pathname);

  const handleClick = (isOpened: boolean) => dispatch(setIsOpened(isOpened));

  useEffect(() => {
    const closeCartOnNavigation = () => {
      handleClick(false);
    };

    if (prevPage.current && (pathname !== prevPage.current)) {
      closeCartOnNavigation();
    }

    prevPage.current = pathname;
  }, [pathname]);

  return [cart.isOpened, handleClick];
}

export default useCart
