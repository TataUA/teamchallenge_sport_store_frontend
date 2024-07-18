import { IProductState } from "./currentProductSlice";

export const selectCurrentProduct = (state: { currentProduct: IProductState }) => state.currentProduct
