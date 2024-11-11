"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// data
import { headerNav, iconsData } from "@/constants";

// components
import SvgComponent from "@/components/SvgComponent/SvgComponent";
import SearchComponent from "@/components/SearchComponent";
import { ModalForm } from "@/components/Auth/ModalForm";
import { LoginPageContent } from "@/components/Auth/LoginUser/LoginPageContent";
import { RegisterPageContent } from "@/components/Auth/RegisterUser/RegisterPageContent";

// utils
import { cn } from "@/services/utils/cn";

// store
import { selectCart } from "@/redux/cart/cartSelector";
import { AppDispatch } from "@/redux/store";
import {
  cleanCart,
  IProductWithMaxQuantity,
  saveCartIdFromDb,
  setLoadingCartFromDB,
  setProduct,
} from "@/redux/cart/cartSlice";
import { selectUserData } from "@/redux/auth/authSelector";

// helpers
import getBasketIdFromLocalStorage, {
  setBasketIdToLocalStorage,
} from "@/helpers/getBasketIdFromLocalStorage";

//hooks
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";
import { useIsMobile } from "@/hooks/useIsMobile";

// api
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
import { ResetPasswordRequestForm } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";
import { ConfirmingLetterContent } from "@/components/Auth/ConfirmEmail/ConfirmingLetterContent";

const HeaderNavLink = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUserData);

  const mounted = useRef(false);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [showModal, setShowModal] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showConfirmRegister, setShowConfirmRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useFetchCurrentUser();

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (mounted.current || cart.loading) {
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
      dispatch(setProduct(updatedProduct));
    };

    const fetchCartFromDb = async (idCart: string) => {
      const response = await fetchShoppingCartFromServerAction(idCart);
      dispatch(cleanCart());

      if (response?.reCreateBasket) {
        createCartInDb();
        return;
      }

      if (response?.items?.length) {
        response?.items.forEach(async (item, index) => {
          fetchProductByIdAndSave(item);
          if (index === response.items.length - 1) {
            dispatch(setLoadingCartFromDB(false));
          }
        });
        dispatch(setLoadingCartFromDB(false));
      }
    };

    const createCartInDb = async () => {
      dispatch(setLoadingCartFromDB(true));

      // якщо створюємо нову то ми отримаємо її ІД і можемо привязати його до юзера
      const { basketId } = await createShoppingCartAction();
      if (basketId) {
        dispatch(saveCartIdFromDb(basketId));
        setBasketIdToLocalStorage(basketId);

        fetchCartFromDb(basketId);

        // тут можливо треба продукти с редакса зберегти в корзину в БД
        cart.products.forEach(async (product) => {
          const response = await saveProductsFromStoreToCartDb(
            basketId,
            product,
          );
          if (response?.id) {
            dispatch(setProduct({ ...product, idInBasketInDb: response?.id }));
          }
          dispatch(setLoadingCartFromDB(false));
        });
      }
      dispatch(setLoadingCartFromDB(false));
    };

    // взаємодія з сервером і корзино в БД тіфльки для авторизованих юзерів
    // для неавторизованих кошик тільки в Local Storage
    if (token) {
      // має бути перевірка чи має юзер корзину
      // const idCart = '462a7df0-9d55-4c58-958b-9239ad174099';
      const basketIdLocalStorage = getBasketIdFromLocalStorage();

      if (basketIdLocalStorage) {
        if (!cart.id) dispatch(saveCartIdFromDb(basketIdLocalStorage));
        fetchCartFromDb(basketIdLocalStorage);
      } else {
        // корзини немає і створюємо її
        createCartInDb();
      }
    } else if (!getBasketIdFromLocalStorage()) {
      createCartInDb();
    }

    mounted.current = true;
  }, [user?.id, pathname]);

  const handleUserClick = () => {
    if (user) {
      router.push("/auth/profile");
    } else {
      if (isMobile) {
        router.push("/auth/login");
      } else {
        setShowRegistration(false);
        setShowModal(true);
      }
    }
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
    setShowResetPassword(false);
    setShowConfirmRegister(false);
  };

  const handleUserEmail = (email: string) => setUserEmail(email);

  return (
    <>
      <ul className="flex items-center gap-1">
        {headerNav.map(({ href, name }) => (
          <li className="py-2 px-2 h-10" key={name}>
            {name === "search" ? (
              <SearchComponent />
            ) : name === "user" ? (
              <span onClick={handleUserClick} className="cursor-pointer">
                {iconsData.map((icon) => {
                  return (
                    icon.name === name && (
                      <SvgComponent
                        key={icon.name}
                        viewBox={icon.viewBox}
                        path={icon.path}
                      />
                    )
                  );
                })}
              </span>
            ) : (
              <Link href={href}>
                {iconsData.map((icon) => {
                  return (
                    icon.name === name && (
                      <span
                        key={icon.name}
                        className="[&>svg]:hover:opacity-[50%] cursor-pointer"
                      >
                        {name === "cart" && cart.products?.length ? (
                          <div
                            className={cn(
                              "relative z-20 bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center",
                              "font-semibold text-sm leading-4",
                              "left-[50%] top-[-25%] ",
                            )}
                          >
                            {cart.products?.length}
                          </div>
                        ) : null}
                        <SvgComponent
                          key={icon.name}
                          viewBox={icon.viewBox}
                          path={icon.path}
                          classname={cn("", {
                            "relative z-10 top-[-18px]":
                              name === "cart" && cart.products?.length,
                          })}
                        />
                      </span>
                    )
                  );
                })}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {!isMobile && showModal && (
        <ModalForm onClose={handleCloseModalClick}>
          {showConfirmRegister ? (
            <ConfirmingLetterContent
              setShowConfirmRegister={setShowConfirmRegister}
              email={userEmail}
            />
          ) : showRegistration ? (
            <RegisterPageContent
              setShowRegistration={setShowRegistration}
              setShowConfirmRegister={setShowConfirmRegister}
              saveUserEmail={handleUserEmail}
            />
          ) : showResetPassword ? (
            <ResetPasswordRequestForm
              setShowResetPassword={setShowResetPassword}
            />
          ) : (
            <LoginPageContent
              setShowModal={setShowModal}
              setShowRegistration={setShowRegistration}
              setShowConfirmRegister={setShowConfirmRegister}
              setShowResetPassword={setShowResetPassword}
              saveUserEmail={handleUserEmail}
            />
          )}
        </ModalForm>
      )}
    </>
  );
};

export default HeaderNavLink;
