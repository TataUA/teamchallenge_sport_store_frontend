import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// api
import { sendSearchQueryApi } from "@/services/api";

// types
import { IProduct } from "@/services/types";

export interface ISearchState {
  products: IProduct[] | null
  previousQueries: string[]
  query: string
  loading: boolean
  error: boolean
}

const initialState: ISearchState = {
  products: null,
  query: '',
  previousQueries: [],
  loading: false,
  error: false,
};

export const sendSearchQueryThunk = createAsyncThunk(
  'search/sendSearchQuery',
  async (query: string, thunkAPI) => {
    const data = await sendSearchQueryApi(query)
    return data
  },
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResultProducts: (state, {payload}:  PayloadAction<IProduct[] | null>) => {
      if(Array.isArray(payload)) state.products = [...payload]
      if(!payload) state.products = null
    },
    setSearchQuery: (state, {payload}:  PayloadAction<string>) => {
      state.query = payload
    },
    saveSearchQueryToArray: (state, {payload}:  PayloadAction<string>) => {
      if((state.previousQueries.indexOf(payload) < 0) && (state.previousQueries?.length >= 5)) {
        state.previousQueries.shift()
        state.previousQueries.push(payload)
      } else if(state.previousQueries.indexOf(payload) < 0 && (state.previousQueries?.length < 5)) {
        state.previousQueries.push(payload)
      } 
    },
    setErrorNull: (state) => {
      state.error = false
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendSearchQueryThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(sendSearchQueryThunk.fulfilled, (state, {payload}: PayloadAction<IProduct[]>) => {
        state.loading = false
        state.products = [...payload]
      })
      .addCase(sendSearchQueryThunk.rejected, (state) => {
        state.loading = false
        state.error = true
      })
})

export const searchReducer = searchSlice.reducer;
export const { 
  setSearchResultProducts, 
  setSearchQuery,
  setErrorNull,
  saveSearchQueryToArray,
  } = searchSlice.actions;
