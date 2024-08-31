import { IOrderState } from "./orderSlice";

export const selectOrder = (state: { order: IOrderState }) => state.order
