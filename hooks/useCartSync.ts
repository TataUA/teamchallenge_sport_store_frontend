import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";

import {
  cleanCart,
  setCart,
  setModalProductIsOutOfStock,
} from "@/redux/cart/cartSlice";
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import fetchShoppingCartFromServerAction from "@/app/actions/fetchShoppingCartFromServerAction";
import getProductsByFetchingProductById from "@/helpers/getProductsByFetchingProductById";
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";
import { IProductWithMaxQuantity, IQuantity } from "@/services/types";
import { selectUserData } from "@/redux/auth/authSelector";

function mergeProducts(
  productsFromServer: IProductWithMaxQuantity[],
  productsFromLocalStorage: IProductWithMaxQuantity[],
): {
  mergedProducts: IProductWithMaxQuantity[];
  newItems: IProductWithMaxQuantity[];
} {
  const mergedProducts: IProductWithMaxQuantity[] = [...productsFromServer];
  const newItems: IProductWithMaxQuantity[] = [];

  for (let index = 0; index < productsFromLocalStorage.length; index++) {
    const productFromLocalStorage = productsFromLocalStorage[index];

    const existingProduct = mergedProducts.find(
      (p) =>
        p.id === productFromLocalStorage.id &&
        p.quantity[0].size === productFromLocalStorage.quantity[0].size &&
        p.quantity[0].color === productFromLocalStorage.quantity[0].color,
    );

    if (existingProduct) {
      // Проверяем совпадение массива colors и размеров
      const colorAndSizeMatch = existingProduct.quantity.every(
        (existingProductQuantity) =>
          productFromLocalStorage.quantity.some(
            (localProductQuantity: IQuantity) =>
              localProductQuantity.size.toLowerCase() ===
                existingProductQuantity.size.toLowerCase() &&
              localProductQuantity.color.toLowerCase() ===
                existingProductQuantity.color.toLowerCase(),
          ),
      );

      if (colorAndSizeMatch) {
        // Если совпадают цвета и размеры, обновляем количество
        for (const quantity1 of productFromLocalStorage.quantity) {
          const existingQuantityAllMatchItem = existingProduct.quantity.find(
            (q) => q.size === quantity1.size && q.color === quantity1.color,
          );

          if (existingQuantityAllMatchItem) {
            if (existingQuantityAllMatchItem.quantity < quantity1.quantity) {
              // Проверяем, что новое количество не превышает максимальное
              existingQuantityAllMatchItem.quantity = Math.min(
                existingQuantityAllMatchItem.quantity + quantity1.quantity,
                existingProduct.maxQuantity,
              );
            }
          }
        }
      } else {
        // Если не совпадают цвета или размеры, добавляем новый продукт
        mergedProducts.push({
          ...productFromLocalStorage,
          quantity: productFromLocalStorage.quantity.filter(
            (q: IQuantity) => q.quantity <= productFromLocalStorage.maxQuantity,
          ),
        });

        newItems.push({
          ...productFromLocalStorage,
          quantity: productFromLocalStorage.quantity.filter(
            (q: IQuantity) => q.quantity <= productFromLocalStorage.maxQuantity,
          ),
        });

        console.log({
          ...productFromLocalStorage,
          quantity: productFromLocalStorage.quantity.filter(
            (q: IQuantity) => q.quantity <= productFromLocalStorage.maxQuantity,
          ),
        });
      }
    } else {
      // Если продукт еще не найден, добавляем новый
      mergedProducts.push({
        ...productFromLocalStorage,
        quantity: productFromLocalStorage.quantity.filter(
          (q: IQuantity) => q.quantity <= productFromLocalStorage.maxQuantity,
        ),
      });

      newItems.push({
        ...productFromLocalStorage,
        quantity: productFromLocalStorage.quantity.filter(
          (q: IQuantity) => q.quantity <= productFromLocalStorage.maxQuantity,
        ),
      });
    }
  }

  return { mergedProducts, newItems };
}

const syncCartOnLogin =
  () => async (dispatch: AppDispatch, getState: () => AppState) => {
    const { cart } = getState();

    const basketId = await createShoppingCartAction();

    if (!basketId) {
      console.log(
        "syncCartOnLogin: Error while create shopping cart on server",
      );

      return;
    }

    // Получение данных из БД
    let userCart = await fetchShoppingCartFromServerAction(basketId);

    if (!userCart) {
      return;
    }

    let productsFromCartServer: IProductWithMaxQuantity[] =
      await getProductsByFetchingProductById(userCart?.items);

    console.log("syncCartOnLogin -> data before merge products", {
      products: cart.products,
      productsFromCartServer,
    });

    // Объединение корзин
    const {
      mergedProducts,
      newItems,
    }: {
      mergedProducts: IProductWithMaxQuantity[];
      newItems: IProductWithMaxQuantity[];
    } = mergeProducts(productsFromCartServer, cart.products);

    console.log("syncCartOnLogin -> data after merged products", {
      mergedProducts,
      newItems,
    });

    // Сохранение локальной корзины в БД
    const productsOutOfStock: IProductWithMaxQuantity[] = [];

    newItems.forEach(async (product: IProductWithMaxQuantity, index) => {
      const response = await addProductToCartInDbAction(basketId, product);

      if (!response) {
        productsOutOfStock.push(product);
        return;
      }
    });

    if (productsOutOfStock.length) {
      dispatch(
        setModalProductIsOutOfStock({
          isOpened: true,
          outOfStockProducts: productsOutOfStock,
        }),
      );
    }

    // Очистка локального хранилища
    dispatch(cleanCart());

    // Обновление Redux Store обьединенной корзиной
    dispatch(setCart(mergedProducts));
  };

export const useCartSync = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserData);

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!user && mounted.current) {
      mounted.current = false;
    }
    
    if (mounted.current) {
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (token) {
      // Пользователь вошел: синхронизация с БД
      dispatch(syncCartOnLogin());

      mounted.current = true;
      
      return;
    }
  }, [user, dispatch]);
};
