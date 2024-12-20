import { useDispatch, useSelector } from "react-redux";

// store
import {
  handleDecreasProductQuantity,
  handleIncreasProductQuantity,
  removeProductById,
} from "@/redux/cart/cartSlice";
import { selectCart } from "@/redux/cart/cartSelector";

// types
import { IProductWithMaxQuantity } from "@/services/types";

// components
import ProductItem from "./ProductItem";
import CartFooter from "./CartFooter";

// actions
import removeProductToCartInDbAction from "@/app/actions/removeProductToCartInDbAction";
import updateQuantityProductInCartInDbAction from "@/app/actions/updateQuantityProductInCartInDbAction";

const Cart = ({ products }: { products: IProductWithMaxQuantity[] }) => {
  const dispatch = useDispatch();

  const cartDataStored = useSelector(selectCart);

  const basketId = cartDataStored.id || localStorage.getItem("basketId");
  const token = localStorage.getItem("accessToken");

  const handleRemoveProduct = ({
    id,
    color,
    size,
    itemIdInBasket,
  }: {
    id: number;
    color: string;
    size: string;
    itemIdInBasket?: number;
  }) => {
    // видаляємо продукт с корзини в БД
    if (itemIdInBasket && basketId) {
      removeProductToCartInDbAction(basketId, itemIdInBasket);
    }
    dispatch(removeProductById({ id, color, size }));
  };

  const handleIncreaseOrDecreasProduct = (
    option: string,
    product: IProductWithMaxQuantity,
  ) => {
    if (option === "inc") {
      if (product.quantity[0].quantity >= product.maxQuantity) {
        console.log("Maximum amount of product has been achieved");

        return;
      }

      const updatedProductWithIncreasedQuantity = {
        ...product,
        quantity: [
          {
            ...product.quantity[0],
            quantity: product.quantity[0].quantity + 1,
          },
        ],
      };

      if (
        token &&
        basketId &&
        updatedProductWithIncreasedQuantity.idInBasketInDb
      ) {
        updateQuantityProductInCartInDbAction(
          basketId,
          updatedProductWithIncreasedQuantity,
          updatedProductWithIncreasedQuantity.idInBasketInDb,
        );
      }

      dispatch(handleIncreasProductQuantity(product));
    }

    if (option === "dec") {
      if (product.quantity[0].quantity <= 1) {
        handleRemoveProduct({
          id: product.id,
          color: product.colors[0].color.title,
          size: product.size[0].value,
          itemIdInBasket: product.idInBasketInDb,
        });
      } else {
        const updatedProductWithDecreasedQuantity = {
          ...product,
          quantity: [
            {
              ...product.quantity[0],
              quantity: product.quantity[0].quantity - 1,
            },
          ],
        };

        if (
          token &&
          basketId &&
          updatedProductWithDecreasedQuantity.idInBasketInDb
        ) {
          updateQuantityProductInCartInDbAction(
            basketId,
            updatedProductWithDecreasedQuantity,
            updatedProductWithDecreasedQuantity.idInBasketInDb,
          );
        }
        dispatch(handleDecreasProductQuantity(product));
      }
    }
  };

  if (cartDataStored.loading) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pb-[170px]">
        <h3 className="text-heading font-bold leading-140 mb-4 text-title">
          Кошик
          <span className="ml-2 font-semibold text-subheading text-primary">
            ({products.length})
          </span>
        </h3>
        <ul className="h-[100%] overflow-auto">
          {products.map((product, index) => (
            <li key={product.id}>
              <ProductItem
                product={product}
                handleRemoveProduct={handleRemoveProduct}
                handleIncreaseOrDecreasProduct={handleIncreaseOrDecreasProduct}
              />
              {products?.length - 1 === index ? null : (
                <div className="border-t border-border mb-6 mt-6"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;
