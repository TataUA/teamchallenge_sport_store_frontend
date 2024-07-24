import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// api
import { sendSearchQueryApi } from "@/services/api";

// types
import { IProduct } from "@/services/types";

export interface ISearchState {
  products: IProduct[] | null
  query: string
  loading: boolean
  error: boolean
}

const initialState: ISearchState = {
  products: null,
  query: '',
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
    setProductsSearchResult: (state, {payload}:  PayloadAction<IProduct[]>) => {
      state.products = [...payload]
    },
    setSearchQuery: (state, {payload}:  PayloadAction<string>) => {
      state.query = payload
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
        state.products = [...payload]
        state.loading = false
      })
      .addCase(sendSearchQueryThunk.rejected, (state) => {
        state.loading = false
        state.error = true
      })
})

export const searchReducer = searchSlice.reducer;
export const { 
  setProductsSearchResult, 
  setSearchQuery,
  setErrorNull
  } = searchSlice.actions;
