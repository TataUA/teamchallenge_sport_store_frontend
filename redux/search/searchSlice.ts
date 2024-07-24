import { IProduct } from "@/services/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchState {
  products: IProduct[]
}

const initialState: ISearchState = {
  products: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setProductsSearchResult: (state, {payload}:  PayloadAction<IProduct[]>) => {
      state.products = [...payload]
    },
  }
})

export const searchReducer = searchSlice.reducer;
export const { 
  setProductsSearchResult, 
  } = searchSlice.actions;
