// core
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { selectUserData } from "@/redux/auth/authSelector";
import { AppDispatch } from "@/redux/store";
import {
  handleDecreasProductQuantity,
  IProductWithMaxQuantity,
  removeProductById,
  saveCartIdFromDb,
  setLoadingCartFromDB,
  setModalProductIsOutOfStock,
  setProduct,
} from "@/redux/cart/cartSlice";

// services
import { getTokenFromLocalStorage } from "@/services/api";

// actions
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import fetchShoppingCartFromServerAction, {
  ICartResponseItem,
} from "@/app/actions/fetchShoppingCartFromServerAction";
import fetchProductByIdClientAction from "@/app/actions/fetchProductByIdClientAction";
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";

// types
import { IProduct } from "@/services/types";

// helpers
import { setBasketIdToLocalStorage } from "@/helpers/getBasketIdFromLocalStorage";
import { selectCart } from "@/redux/cart/cartSelector";

const useCartManagement = (): void => {
  const mounted = useRef(false);

  const dispatch: AppDispatch = useDispatch();

  const user = useSelector(selectUserData);
  const cart = useSelector(selectCart);

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (!user?.id || mounted.current || cart.loading) {
      return;
    }

    const saveProductsFromStoreToCartDb = (
      id: string,
      product: IProductWithMaxQuantity,
    ) => {
      return addProductToCartInDbAction(id, product);
    };

    const fetchProductByIdAndSave = async (item: ICartResponseItem) => {
      const productData: IProduct = await fetchProductByIdClientAction(
        item.product,
        item.color,
        item.size,
      );

      const colors = productData.colors.filter(
        (colorItem) => colorItem.color.id === item.color,
      );

      const size = productData.size.filter(
        (sizeItem) => sizeItem.id === item.size,
      );

      const filteredQuantities = [...productData.quantity].filter(
        (q) =>
          q.size === size[0]?.value &&
          q.color.toLowerCase() === colors[0]?.color.title.toLowerCase(),
      );

      const updatedProduct = {
        ...productData,
        colors,
        size,
        quantity: [
          {
            size: size[0]?.value,
            color: colors[0]?.color.title,
            quantity: item.quantity,
          },
        ],
        maxQuantity: filteredQuantities[0].quantity,
        idInBasketInDb: item.id,
      };

      const duplicatedProduct = cart.products.filter(
        (product) =>
          product.id === updatedProduct.id &&
          product.quantity[0].size === updatedProduct.quantity[0].size &&
          product.quantity[0].color === updatedProduct.quantity[0].color,
      );

      console.log("fetchProductByIdAndSave -> ", {
        duplicatedProduct,
        updatedProduct,
        products: cart.products,
      });
      

      if (
        duplicatedProduct.length
      ) {
        console.log(`Duplicated product id-${updatedProduct.id}, Title- ${updatedProduct.title}`);

        return;
      }

      dispatch(setProduct(updatedProduct));
    };

    const saveBasketItems = async (items: ICartResponseItem[]) => {
      if (!items?.length) {
        return;
      }

      items.forEach(async (item: any, index: number) => {
        fetchProductByIdAndSave(item);

        if (index === items.length - 1) {
          dispatch(setLoadingCartFromDB(false));
        }
      });

      dispatch(setLoadingCartFromDB(false));
    };

    const createCartInDb = async () => {
      dispatch(setLoadingCartFromDB(true));

      let { basketId } = await createShoppingCartAction();

      if (!basketId) {
        throw new Error(`createCartInDb -> Basket id is incorrect ${basketId}`);
      }

      let response = await fetchShoppingCartFromServerAction(basketId);

      if (response?.reCreateBasket) {
        const data = await createShoppingCartAction();

        if (!basketId) {
          throw new Error(
            `createCartInDb -> reCreateBasket -> Basket id is incorrect ${basketId}`,
          );
        }

        basketId = data.basketId;
        response = await fetchShoppingCartFromServerAction(basketId);
      }

      dispatch(saveCartIdFromDb(basketId));
      setBasketIdToLocalStorage(basketId);

      if (response?.items) {
        saveBasketItems(response?.items);
      }

      // тут можливо треба продукти с редакса зберегти в корзину в БД
      if (cart.products?.length) {
        cart.products.forEach(
          async (product: IProductWithMaxQuantity, index) => {
            const response = await saveProductsFromStoreToCartDb(
              basketId,
              product,
            );console.log("createCartInDb -> response ", response);
            
            if (!response) {
              product.quantity[0].quantity > 1
                ? dispatch(handleDecreasProductQuantity(product))
                : dispatch(
                    removeProductById({
                      id: product.id,
                      color: product.quantity[0].color,
                      size: product.quantity[0].size,
                    }),
                  );

              dispatch(setModalProductIsOutOfStock(true));
              return;
            }

            dispatch(setProduct({ ...product, idInBasketInDb: response?.id }));

            if (index === cart.products?.length - 1) {
              dispatch(setLoadingCartFromDB(false));
            }
          },
        );
      } else {
        dispatch(setLoadingCartFromDB(false));
      }
    };

    if (token) {
      createCartInDb();
    }

    mounted.current = true;
  }, [user?.id, dispatch]);

  return;
};

export default useCartManagement;
