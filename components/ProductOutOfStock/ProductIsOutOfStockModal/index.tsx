"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { cn } from "@/services/utils/cn";

// helpers
import getCloseIconSVG from "@/helpers/getCloseIconSVG";

// store
import { selectCart } from "@/redux/cart/cartSelector";
import { setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";

const ProductIsOutOfStockModal = (props:{children: ReactNode}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {isDisplayedModalProductIsOutOfStock} = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onClose = () =>
    dispatch(
      setModalProductIsOutOfStock({
        isOpened: false,
      }),
    );

  if (!isDisplayedModalProductIsOutOfStock) {
    return null;
  }
 
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center",
        `items-center`,
      )}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn("relative w-full max-w-fit p-4  md:p-0")}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "bg-white w-full max-h-[85vh] overflow-y-auto p-6 rounded-3xl md:p-10",
            "min-[2800px]:p-10",
          )}
        >
          <div className="relative">
            {isMobile ? (
              <span
                className="absolute right-0 top-0 [&>svg]:w-[18px] [&>svg]:h-[18px] cursor-pointer min-[2800px]:text-4xl"
                onClick={onClose}
              >
                {getCloseIconSVG()}
              </span>
            ) : null}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIsOutOfStockModal;
