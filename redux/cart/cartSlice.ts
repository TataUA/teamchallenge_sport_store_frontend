import {
  IProduct,
  IProductWithMaxQuantity,
} from "@/services/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartState {
  products: IProductWithMaxQuantity[];
  outOfStockProducts: IProduct[];
  id: string;
  error: boolean;
  loading: boolean;
  isDisplayedModalProductIsOutOfStock: boolean;
}
export interface ICartCreatedResponse {
  items: any[];
  id: string;
}

const initialState: ICartState = {
  products: [],
  outOfStockProducts: [],
  id: "",
  error: false,
  loading: false,
  isDisplayedModalProductIsOutOfStock: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProduct: (
      state,
      { payload }: PayloadAction<IProductWithMaxQuantity>,
    ) => {
      const existingProductIndex = state.products.findIndex((product) => {
        const productData = JSON.parse(JSON.stringify(product));

        return (
          productData.id === payload.id &&
          productData.quantity[0].size.toLowerCase() ===
            payload.quantity[0].size.toLowerCase() &&
          productData.quantity[0].color.toLowerCase() ===
            payload.quantity[0].color.toLowerCase()
        );
      });

      if (existingProductIndex < 0) {
        state.products = [...state.products, payload];
      } else {
        state.products[existingProductIndex] = {
          ...payload,
          quantity: [
            {
              ...payload.quantity[0],
              quantity:
                payload.quantity[0].quantity + 1 > payload.maxQuantity
                  ? payload.maxQuantity
                  : payload.quantity[0].quantity + 1,
            },
          ],
        };
      }
    },

    removeProductById: (
      state,
      { payload }: PayloadAction<{ id: number; color: string; size: string }>,
    ) => {
      state.products = state.products.filter(
        (product) =>
          !(
            product.id === payload.id &&
            product.colors[0].color.title === payload.color &&
            product.size[0].value === payload.size
          ),
      );
    },
    handleIncreasProductQuantity: (
      state,
      { payload }: PayloadAction<IProductWithMaxQuantity>,
    ) => {
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product.id === payload.id &&
          product.size[0].value.toLowerCase() ===
            payload.size[0].value.toLowerCase() &&
          product.colors[0].color.title.toLowerCase() ===
            product.colors[0].color.title.toLowerCase(),
      );

      state.products[existingProductIndex] = {
        ...payload,
        quantity: [
          {
            ...payload.quantity[0],
            quantity: payload.quantity[0].quantity + 1,
          },
        ],
      };
    },
    handleDecreasProductQuantity: (
      state,
      { payload }: PayloadAction<IProductWithMaxQuantity>,
    ) => {
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product.id === payload.id &&
          product.size[0].value.toLowerCase() ===
            payload.size[0].value.toLowerCase() &&
          product.colors[0].color.title.toLowerCase() ===
            product.colors[0].color.title.toLowerCase(),
      );

      state.products[existingProductIndex] = {
        ...payload,
        quantity: [
          {
            ...payload.quantity[0],
            quantity: payload.quantity[0].quantity - 1,
          },
        ],
      };
    },
    saveCartIdFromDb: (state, { payload }: PayloadAction<string>) => {
      state.id = payload;
    },

    cleanCart: (state) => {
      state.products = [];
    },

    setCart: (state, { payload }: PayloadAction<IProductWithMaxQuantity[]>) => {
      state.products = payload;
    },

    setLoadingCartFromDB: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setModalProductIsOutOfStock: (
      state,
      {
        payload,
      }: PayloadAction<{
        isOpened: boolean;
        outOfStockProducts?: IProduct[];
      }>,
    ) => {
      state.isDisplayedModalProductIsOutOfStock = payload.isOpened;
      state.outOfStockProducts = payload.outOfStockProducts || [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  setProduct,
  removeProductById,
  saveCartIdFromDb,
  cleanCart,
  setCart,
  handleDecreasProductQuantity,
  handleIncreasProductQuantity,
  setLoadingCartFromDB,
  setModalProductIsOutOfStock,
} = cartSlice.actions;
