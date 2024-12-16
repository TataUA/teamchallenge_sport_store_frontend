"use client";

// core
import { useDispatch, useSelector } from "react-redux";

// slices
import { setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";
import { selectCart } from "@/redux/cart/cartSelector";

// components
import ProductIsOutOfStockModal from "./ProductIsOutOfStockModal";

const ProductOutOfStock = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

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
        {cart.outOfStockProducts.length ? (
          <ul>
            <br />
            Список товарів:
            {cart.outOfStockProducts.map((product, index) => (
              <li key={index}>
                <span>{product.title},</span>{" "}
                <span>колір:{product.quantity[0].color}</span>,{" "}
                <span>розмір:{product.quantity[0].size}</span>
              </li>
            ))}
          </ul>
          ) : null}
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
          onClick={() =>
            dispatch(
              setModalProductIsOutOfStock({
                isOpened: false,
              }),
            )
          }
        >
          Продовжити покупки
        </div>
      </div>
    </ProductIsOutOfStockModal>
  );
};

export default ProductOutOfStock;
