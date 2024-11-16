"use client";

// core
import { useDispatch } from "react-redux";

// slices
import { setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";

// components
import ProductIsOutOfStockModal from "./ProductIsOutOfStockModal";

const ProductOutOfStock = () => {
  const dispatch = useDispatch();

  const buttonClassname =
    "py-[11px] h-fit px-4 border-[1px] rounded-lg text-center border-blue w-full cursor-pointer";

  return (
    <ProductIsOutOfStockModal>
      <div className="mb-8">
        <h3 className="mb-4 text-xl color-primary font-bold mr-6 md:mb-8">
          О ні, цей товар закінчився на складі!
        </h3>
        <p className="text-sm md:text-base color-primary font-medium">
          Ми працюємо над його поповненням – слідкуйте за оновленнями!
        </p>
      </div>
      <div className="flex gap-4 flex-wrap md:flex-nowrap justify-between text-base md:gap-5">
        <a
          href="/cart"
          className={
            buttonClassname + " text-blue hover:text-white hover:bg-blue"
          }
        >
          Перейти в кошик
        </a>
        <div
          className={
            buttonClassname +
            " text-white bg-blue hover:text-blue hover:bg-white"
          }
          onClick={() => dispatch(setModalProductIsOutOfStock(false))}
        >
          Продовжити покупки
        </div>
      </div>
    </ProductIsOutOfStockModal>
  );
};

export default ProductOutOfStock;
