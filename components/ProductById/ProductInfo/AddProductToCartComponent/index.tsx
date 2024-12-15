"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// components
import ResponsiveModal from "@/components/Shared/ResponsiveModal";

// helpers
import getCartSVG from "@/helpers/getCartSVG";
import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn";

// redux
import {
  setModalProductIsOutOfStock,
  setProduct,
} from "@/redux/cart/cartSlice";
import { selectCurrentProduct } from "@/redux/currentProduct/currentProductSelector";
import {
  setCurrentProduct,
  setIsSizeModalOpened,
} from "@/redux/currentProduct/currentProductSlice";
import { selectCart } from "@/redux/cart/cartSelector";

// types
import { IProduct, ProductSize } from "@/services/types";

// data
import { generalProductsFilers } from "@/components/ProductsList/ProductsFilters/filtersData";

// zctions
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";
import fetchProductByIdAction from "@/app/actions/fetchProductByIdAction";

const AddProductToCartComponent = ({ product }: { product: IProduct }) => {
  const [isSuccessModalIsOpened, setIsSuccessModalIsOpened] = useState(false);

  const dispatch = useDispatch();

  const currentProduct = useSelector(selectCurrentProduct);

  const cart = useSelector(selectCart);

  const { sizes: sizesStored } = currentProduct;

  const isShoesSizes = () => {
    if (sizesStored?.length) {
      const shoesSizes = generalProductsFilers.filter(
        (item) => item.id === "sizes",
      )[0].sizesShoes;
      return shoesSizes?.includes(sizesStored.toString());
    }
  };

  const handleClickCartButton = async () => {
    if (!sizesStored?.length) {
      dispatch(setIsSizeModalOpened(true));
      return;
    }

    const productInfo = await fetchProductByIdAction(product.id);
    console.log("🚀 ~ handleClickCartButton ~ productInfo:", productInfo);

    if (!productInfo) {
      console.log(
        "We didin't receive info about product and it's quantity from DB " +
          product.id,
      );

      return;
    }

    const isProductExists = productInfo.quantity.filter(
      (item: { size: string; color: string; quantity: number }) =>
        item.quantity >= 1 &&
        item.color.toLowerCase() === currentProduct.color.toLowerCase() &&
        item.size.toLowerCase() == currentProduct.sizes.toLowerCase(),
    );

    if (!isProductExists.length) {
      dispatch(
        setModalProductIsOutOfStock({
          isOpened: true,
          outOfStockProducts: [product],
        }),
      );
      return;
    }

    const selectedProductSize: ProductSize = {
      id: product.size.filter(
        (sizeItem) =>
          sizeItem.value.toLowerCase() === sizesStored.toLowerCase(),
      )[0].id,
      value: sizesStored,
    };

    const selectedColor =
      currentProduct.color || product.colors[0]?.color.title;
    const filteredQuantities = [...product.quantity].filter(
      (q) =>
        q.size === sizesStored &&
        q.color.toLowerCase() === selectedColor.toLowerCase(),
    );

    const selectedImage =
      product.colors.find((c) => c.color.title === selectedColor)?.image_url ||
      product.colors[0]?.image_url; // Добавляем значение по умолчанию, если изображение не найдено

    const productWithSelectedSizeAndColor = {
      ...product,
      size: [selectedProductSize],
      quantity: [{ ...filteredQuantities[0], quantity: 1 }],
      maxQuantity: filteredQuantities[0].quantity,
      colors: [
        {
          image_url: selectedImage,
          color: {
            id:
              product.colors.find(
                (c) =>
                  c.color.title.toLowerCase() === selectedColor.toLowerCase(),
              )?.color.id || 0,
            title: selectedColor,
          },
        },
      ],
    };

    const basketId = localStorage.getItem("basketId");

    const existingProduct = cart.products.find(
      (product) =>
        product.id === productWithSelectedSizeAndColor.id &&
        product.quantity[0].size ===
          productWithSelectedSizeAndColor.quantity[0].size &&
        product.quantity[0].color ===
          productWithSelectedSizeAndColor.quantity[0].color,
    );

    if (
      existingProduct &&
      existingProduct.quantity[0].quantity >= existingProduct.maxQuantity
    ) {
      dispatch(
        setModalProductIsOutOfStock({
          isOpened: true,
          outOfStockProducts: [productWithSelectedSizeAndColor],
        }),
      );

      return;
    }

    if (basketId) {
      const itemIdInBasket = await addProductToCartInDbAction(
        basketId,
        productWithSelectedSizeAndColor,
      );

      if (!itemIdInBasket) {
        dispatch(
          setModalProductIsOutOfStock({
            isOpened: true,
            outOfStockProducts: [productWithSelectedSizeAndColor],
          }),
        );
        return;
      }

      dispatch(
        setProduct({
          ...productWithSelectedSizeAndColor,
          idInBasketInDb: itemIdInBasket,
        }),
      );
    } else {
      dispatch(setProduct(productWithSelectedSizeAndColor));
    }

    setIsSuccessModalIsOpened(true);
  };

  useEffect(() => {
    dispatch(setCurrentProduct(product));
  }, [dispatch, product]);

  return (
    <div>
      <div
        className={cn(
          "bg-blue mb-8 w-full text-white py-4 px-10 fill-white cursor-pointer flex justify-center items-center gap-2 rounded-xl",
          "[&>svg]:text-white",
          "hover:opacity-[75%]",
          "lg:max-w-[500px] 2xl:3xl",
        )}
        onClick={() => handleClickCartButton()}
      >
        {getCartSVG()}
        Додати до кошика
      </div>
      <ResponsiveModal
        isOpen={isSuccessModalIsOpened}
        onClose={() => setIsSuccessModalIsOpened(false)}
      >
        <div className="flex gap-3 pt-5 justify-center items-center mb-10">
          <span className="bg-blue rounded-[50%] [&>svg]:fill-white [&>svg]:text-white">
            {getCheckedIconSVG()}
          </span>
          <h3 className="text-xl text-[#272728]">Товар додано в кошик!</h3>
        </div>
        <div className="flex gap-3 mb-8">
          <div
            className={cn(
              "w-[108px] h-[108px] bg-blue rounded-xl overflow-hidden",
            )}
          >
            <Image
              width={108}
              height={108}
              src={product.colors?.[0]?.image_url}
              alt="photo_product"
            />
          </div>
          <div className="flex flex-col justify-evenly flex-1">
            <p>{product.title}</p>
            <div className="flex justify-between">
              <span className="text-[#868687] text-sm">
                Розмір: {isShoesSizes() ? `${sizesStored} UA` : sizesStored}
              </span>
              <span className="text-[#1A1A1C] font-semibold text-base">
                {product.price} грн
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div
            onClick={() => setIsSuccessModalIsOpened(false)}
            className={cn(
              "text-blue rounded-xl border-[1px] border-blue py-4 px-20 mb-3",
              "hover:text-white hover:bg-blue cursor-pointer",
            )}
          >
            Продовжити покупки
          </div>
          <Link
            href={"/cart"}
            className={cn(
              "text-white bg-blue rounded-xl py-4 px-20 mb-3 inline-block w-full",
              "hover:text-blue hover:bg-white hover:border-blue border-[1px] cursor-pointer",
            )}
          >
            Перейти в кошик
          </Link>
        </div>
      </ResponsiveModal>
    </div>
  );
};

export default AddProductToCartComponent;
