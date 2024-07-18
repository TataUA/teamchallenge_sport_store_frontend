import { IProduct } from "@/services/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProductState {
  sizes:  string[];
  price: number 
  color: string;
  isSizeModalOpened: boolean;
  product: IProduct | null
}

const initialState: IProductState = {
  sizes: [],
  price: 0 ,
  color: '',
  isSizeModalOpened: false,
  product: null
};

const currentProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentProductSize: (state, {payload}:  PayloadAction<string>) => {
      state.sizes.push(payload)
    },
    removeCurrentProductSize: (state, {payload}:  PayloadAction<string>) => {
      const index = state.sizes.indexOf(payload)
      state.sizes.splice(index, 1)
    },
    setCurrentProductPrice: (state, {payload}:  PayloadAction<number>) => {
      state.price = payload
    },
    setCurrentProductColor: (state, {payload}:  PayloadAction<string>) => {
      state.color = payload
    },
    setIsSizeModalOpened: (state, {payload}:  PayloadAction<boolean>) => {
      state.isSizeModalOpened = payload
    },
    setCurrentProduct: (state, {payload}:  PayloadAction<IProduct>) => {
      state.product = {...payload}
    },
  }
})

export const currentProductReducer = currentProductSlice.reducer;
export const { 
  setCurrentProductSize, 
  removeCurrentProductSize, 
  setCurrentProductPrice, 
  setCurrentProductColor,
  setIsSizeModalOpened,
  setCurrentProduct,
  } = currentProductSlice.actions;