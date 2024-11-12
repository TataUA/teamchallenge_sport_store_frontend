"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { cn } from "@/services/utils/cn";

// helpers
import getCloseIconSVG from "@/helpers/getCloseIconSVG";

// store
import { selectCart } from "@/redux/cart/cartSelector";
import { setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";

const ProductIsOutOfStockModal = () => {
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
    dispatch(setModalProductIsOutOfStock(!isDisplayedModalProductIsOutOfStock));

  if (!isDisplayedModalProductIsOutOfStock) {
    return null;
  }

  const buttonClassname =
    "py-[11px] h-fit px-4 border-[1px] rounded-lg text-center border-blue w-full cursor-pointer";

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center",
        `items-center`,
      )}
      id='modal-product-is-out-of-stock'
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
            <div className="mb-8">
              <h3 className="mb-4 text-xl color-primary font-bold mr-6 md:mb-8">
                О ні, цей товар закінчився на складі!
              </h3>
              <p className="text-sm md:text-base color-primary font-medium">
                Ми працюємо над його поповненням – слідкуйте за оновленнями!
              </p>
            </div>
            <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between text-base md:gap-5">
              <div
                className={
                  buttonClassname + " text-blue hover:text-white hover:bg-blue"
                }
              >
                Перейти в кошик
              </div>
              <div
                className={
                  buttonClassname +
                  " text-white bg-blue hover:text-blue hover:bg-white"
                }
              >
                Продовжити покупки
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIsOutOfStockModal;
