import { IProduct } from '@/services/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IProductWithMaxQuantity extends IProduct {
	maxQuantity: number
	idInBasketInDb?: number
}
export interface ICartState {
	products: IProductWithMaxQuantity[]
	id: string
	error: boolean
}
export interface ICartCreatedResponse {
	items: any[]
	id: string
}

const initialState: ICartState = {
	products: [],
	id: '',
	error: false,
}


const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setProduct: (state, { payload }: PayloadAction<IProductWithMaxQuantity>) => {
			const existingProductIndex = state.products.findIndex(
				product => product.id === payload.id 
				&& product.size[0].value.toLowerCase() === payload.size[0].value.toLowerCase()
				&& product.colors[0].color.title.toLowerCase() === product.colors[0].color.title.toLowerCase()
			)

			if (existingProductIndex === -1) {
				state.products = [...state.products, payload]
			} else {
				state.products[existingProductIndex] = {...payload}
			}
		},

		removeProductById: (state, { payload }: PayloadAction<{id:number, color:string, size: string}>) => {
			state.products = state.products.filter(product => !(product.id === payload.id
				&& product.colors[0].color.title === payload.color
				&& product.size[0].value === payload.size)
			)
		},
		saveCartIdFromDb: (state, { payload }: PayloadAction<string>) => {
			state.id = payload
		},
		cleanCart: (state) => {
			state.products = []
		}
	},
})

export const cartReducer = cartSlice.reducer
export const { 
	setProduct, 
	removeProductById,
	saveCartIdFromDb,
	cleanCart,
 	} = cartSlice.actions
