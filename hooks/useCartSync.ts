import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";

// slices
import { cleanCart, setCart } from "@/redux/cart/cartSlice";

// selectors
import { selectUserData } from "@/redux/auth/authSelector";

// actions
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import bindShopingCartToUser from "@/app/actions/bindShopinCartToUser";
import isValidShopingCart from "@/app/actions/isValidShopingCart";
import fetchShoppingCartFromServerAction from "@/app/actions/fetchShoppingCartFromServerAction";

// helpers
import getBasketIdFromLocalStorage from "@/helpers/getBasketIdFromLocalStorage";
import getProductsByFetchingProductById from "@/helpers/getProductsByFetchingProductById";

// types
import { IProductWithMaxQuantity } from "@/services/types";
import { UserData } from "@/redux/auth/authSlice";

const createCart = async () => {
  const basketId = getBasketIdFromLocalStorage();

  if (basketId) {
    const isValidCart = await isValidShopingCart(basketId);

    if (isValidCart) {
      return;
    }

    console.log(
      "createCart: Error shopping cart is not valid, basket:" + basketId,
    );
  }

  const newBasketId = await createShoppingCartAction();

  if (!newBasketId) {
    console.log("syncCartOnLogin: Error while create shopping cart on server");

    return;
  }
};

const syncCart =
  () => async (dispatch: AppDispatch, getState: () => AppState) => {
    const basketId = getBasketIdFromLocalStorage();

    if (!basketId) {
      console.log(
        "syncCart: Error while create shopping cart on server, basketId is null",
      );

      return;
    }

    let userCart = await fetchShoppingCartFromServerAction(basketId);

    if (!userCart) {
      console.log(
        "syncCart: Error while fetch shopping cart from server, basketId:" +
          basketId,
      );
      return;
    }

    let productsFromCartServer: IProductWithMaxQuantity[] =
      await getProductsByFetchingProductById(userCart?.items);

    dispatch(cleanCart());

    dispatch(setCart(productsFromCartServer));
  };

export const assignCartToUser = async (userId: number, dispatch: any) => {
  let basketId = getBasketIdFromLocalStorage();

  if (!basketId) {
    await dispatch(createCart());

    basketId = getBasketIdFromLocalStorage();
  }

  const isValidCart = await isValidShopingCart(basketId);

  if (isValidCart?.user) {
    if (isValidCart?.user !== userId) {
      console.log(
        "assignCartToUser: Error while binding shopping cart to user. Basket was already assigned to another user",
      );

      return;
    }

    dispatch(syncCart());

    return;
  }

  const bindedBasketId = await bindShopingCartToUser(basketId);

  if (!bindedBasketId) {
    console.log(
      "assignCartToUser: Error while binding shopping cart to user. Request to bind cart, failed",
    );

    return;
  }

  dispatch(syncCart());
};

const sync = (function sync() {
  let userId: number | null = null;

  return function (userData: any, dispatch: any) {
    if (userId === userData?.id) {
      return;
    }

    createCart();
    userId = userData?.id;

    if (userId) {
      assignCartToUser(userId, dispatch);
    }

  };
})();

export const useCartSync = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserData);

  useEffect(() => {
    sync(user, dispatch);
  }, [user, dispatch]);
};
