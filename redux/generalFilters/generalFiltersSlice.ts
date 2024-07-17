import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGeneralFiltersState {
  sizes:  string[];
  price: {priceFrom: number, priceTo: number} 
  color: string;
}

const initialState: IGeneralFiltersState = {
  sizes: [],
  price: {priceFrom: 499, priceTo: 10999} ,
  color: '',
};

const generalFiltersSlice = createSlice({
  name: 'generalFilters',
  initialState,
  reducers: {
    setSize: (state, {payload}:  PayloadAction<string>) => {
      state.sizes.push(payload)
    },
    removeSize: (state, {payload}:  PayloadAction<string>) => {
      const index = state.sizes.indexOf(payload)
      state.sizes.splice(index, 1)
    },
    setPrice: (state, {payload}:  PayloadAction<{priceFrom?: number, priceTo?: number}>) => {
      state.price = {...state.price, ...payload}
    },
    setColor: (state, {payload}:  PayloadAction<string>) => {
      state.color = payload
    },
    setDefaultsFilters: (state) => {
      state.color = ''
      state.sizes = []
      state.price = {priceFrom: 499, priceTo: 10999}
    }
  }
})

export const generalFiltersReducer = generalFiltersSlice.reducer;
export const { setSize, removeSize, setPrice, setColor, setDefaultsFilters } = generalFiltersSlice.actions;
