import { ICartState } from "./cartSlice";

export const selectCart = (state: { cart: ICartState }) => state.cart
