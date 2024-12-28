import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";

// slices
import {
  saveCartIdFromDb,
} from "@/redux/cart/cartSlice";

// selectors
import { selectUserData } from "@/redux/auth/authSelector";

// actions
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import bindShopingCartToUser from "@/app/actions/bindShopinCartToUser";
import isValidShopingCart from "@/app/actions/isValidShopingCart";

// helpers
import getBasketIdFromLocalStorage, {
} from "@/helpers/getBasketIdFromLocalStorage";

const createCart =
  () => async (dispatch: AppDispatch, getState: () => AppState) => {
    const basketId = getBasketIdFromLocalStorage();

    if (basketId) {
      const isValidCart = await isValidShopingCart(basketId);

      if (isValidCart) {
        dispatch(saveCartIdFromDb(basketId));

        return;
      }
    }

    const newBasketId = await createShoppingCartAction();

    if (!newBasketId) {
      console.log(
        "syncCartOnLogin: Error while create shopping cart on server",
      );

      return;
    }

    dispatch(saveCartIdFromDb(newBasketId));
  };

const assignCartToUser = async () => {
  const basketId = getBasketIdFromLocalStorage();

  const isValidCart = await isValidShopingCart(basketId);
  if (isValidCart?.id) {
    return;
  }

  const result = await bindShopingCartToUser(basketId);

  if (!result) {
    console.log("assignCartToUser: Error while binding shopping cart to user");

    return;
  }
};

export const useCartSync = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserData);

  const mountedAnonim = useRef<boolean>(false);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    if (user) {
      // Пользователь вошел: синхронизация с БД
      assignCartToUser();
      mounted.current = true;

      return;
    }

    if (mountedAnonim.current) {
      return;
    }

    dispatch(createCart());
    mountedAnonim.current = true;
  }, [user, dispatch]);
};
