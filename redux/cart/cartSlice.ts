import { IProduct } from '@/services/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICartState {
	products: IProduct[]
}

const initialState: ICartState = {
	products: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setProduct: (state, { payload }: PayloadAction<IProduct>) => {
			const existingProductIndex = state.products.findIndex(
				product => product.id === payload.id && product.size === payload.size
			)

			if (existingProductIndex === -1) {
				state.products = [...state.products, payload]
			}
		},

		removeProductById: (state, { payload }: PayloadAction<number>) => {
			state.products = state.products.filter(product => product.id !== payload)
		},
	},
})

export const cartReducer = cartSlice.reducer
export const { setProduct, removeProductById } = cartSlice.actions
