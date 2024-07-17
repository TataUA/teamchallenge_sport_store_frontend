import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGeneralFiltersState {
  shoesSizes:  string[];
  clothesSizes:  string[];
  price: {priceFrom: number, priceTo: number} 
  color: string;
}

const initialState: IGeneralFiltersState = {
  shoesSizes: [],
  clothesSizes: [],
  price: {priceFrom: 499, priceTo: 10999} ,
  color: '',
};

const generalFiltersSlice = createSlice({
  name: 'generalFilters',
  initialState,
  reducers: {
    setShoesSize: (state, {payload}:  PayloadAction<string>) => {
      state.shoesSizes.push(payload)
    },
    setClothesSize: (state, {payload}:  PayloadAction<string>) => {
      state.clothesSizes.push(payload)
    },
    removeShoesSize: (state, {payload}:  PayloadAction<string>) => {
      const index = state.shoesSizes.indexOf(payload)
      state.shoesSizes.splice(index, 1)
    },
    removeClothesSize: (state, {payload}:  PayloadAction<string>) => {
      const index = state.clothesSizes.indexOf(payload)
      state.clothesSizes.splice(index, 1)
    },
    setPrice: (state, {payload}:  PayloadAction<{priceFrom?: number, priceTo?: number}>) => {
      state.price = {...state.price, ...payload}
    },
    setColor: (state, {payload}:  PayloadAction<string>) => {
      state.color = payload
    },
    setDefaultsFilters: (state) => {
      state.color = ''
      state.shoesSizes = []
      state.clothesSizes = []
      state.price = {priceFrom: 499, priceTo: 10999}
    }
  }
})

export const generalFiltersReducer = generalFiltersSlice.reducer;
export const { setShoesSize, setClothesSize, removeShoesSize, removeClothesSize, setPrice, setColor, setDefaultsFilters } = generalFiltersSlice.actions;
