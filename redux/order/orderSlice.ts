import { DropdownItemCityNovaPoshta } from '@/components/OrderPageComponent/DeliverSection/CustomCitiesDropdown'
import { INovaPoshtaDepartmentItemResponse } from '@/services/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IOrderState {
	deliveryType: {
		department: boolean,
		postOffice: boolean,
		deliveryMan: boolean,
	},
	city: DropdownItemCityNovaPoshta | null,
	department: INovaPoshtaDepartmentItemResponse | null,
	postOffice: INovaPoshtaDepartmentItemResponse | null,
	deliveryAddress: {
		street: string,
		numberHouse: string,
		numberAppartment: string ,
	},
	payment: {
		cash: boolean,
		card: boolean,
	}
	cardInfo: {
		numberCard: string,
		expire: string,
		cvv: string ,
	},
	allFileds: null | boolean
}

const initialState: IOrderState = {
	deliveryType: {
		department: false,
		postOffice: false,
		deliveryMan: false,
	},
	city: null,
	department: null,
	postOffice: null,
	deliveryAddress: {
		street: '',
		numberHouse: '',
		numberAppartment: '',
	},
	payment: {
		cash: false,
		card: false,
	},
	cardInfo: {
		numberCard: '',
		expire: '',
		cvv: '',
	},
	allFileds: null,
}



const orderSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		handleClickCheckboxDelivery(state, { payload }: PayloadAction<string>) {
			if(payload === 'department') {
				state.deliveryType.department = !state.deliveryType.department
				state.deliveryType.postOffice = false
				state.deliveryType.deliveryMan = false
				return
			}
			if(payload === 'postOffice') {
				state.deliveryType.postOffice = !state.deliveryType.postOffice
				state.deliveryType.department = false
				state.deliveryType.deliveryMan = false
				return
			}
			if(payload === 'deliveryMan') {
				state.deliveryType.deliveryMan = !state.deliveryType.deliveryMan
				state.deliveryType.postOffice = false
				state.deliveryType.department = false
				return
			}
		},
		handleChangeDeliveryAddress(state, { payload }: PayloadAction<{value: string, id: string}>) {
			if(payload.id === 'street') {
				state.deliveryAddress.street = payload.value

				return
			}
			if(payload.id === 'numberHouse') {
				state.deliveryAddress.numberHouse = payload.value

				return
			}
			if(payload.id === 'numberAppartment') {
				state.deliveryAddress.numberAppartment = payload.value
				return
			}
		},
		handleChangeCardInfo(state, { payload }: PayloadAction<{value: string, name: string}>) {
			if(payload.name === 'numberCard') {
				state.cardInfo.numberCard = payload.value

				return
			}
			if(payload.name === 'expire') {
				state.cardInfo.expire = payload.value

				return
			}
			if(payload.name === 'cvv') {
				state.cardInfo.cvv = payload.value
				return
			}
		},
		handleClickCheckboxPayment(state, { payload }: PayloadAction<string>) {
			if(payload === 'cash') {
				state.payment.cash = !state.payment.cash
				state.payment.card = false
				return
			}
			if(payload === 'card') {
				state.payment.card = !state.payment.card
				state.payment.cash = false
				return
			}
		},
		setCityToStore(state, { payload }: PayloadAction<DropdownItemCityNovaPoshta | null>) {
			state.city = payload
		},
		setDepartmentToStore(state, { payload }: PayloadAction<{Description: string}>) {
			state.department = payload
		},
		setPostOffice(state, { payload }: PayloadAction<INovaPoshtaDepartmentItemResponse>) {
			state.postOffice = payload
		},
		validationAllFields(state) {
			if(!state.city || (!state.department && !state.postOffice)) {
				state.allFileds = false
			} else if (state.postOffice && (
				!state.deliveryAddress.street || !state.deliveryAddress.numberHouse
			)) {
				state.allFileds = false
			} else if (!state.payment.card && !state.payment.cash) {
				state.allFileds = false
			} else if (state.payment.card && (
				!state.cardInfo.numberCard || !state.cardInfo.expire || !state.cardInfo.cvv
			)) {
				state.allFileds = false
			} else {
				state.allFileds = true
			}
		},
	},
})


export const orderReducer = orderSlice.reducer
export const { 
	handleClickCheckboxDelivery,
	handleClickCheckboxPayment,
	setCityToStore,
	setDepartmentToStore,
	setPostOffice,
	handleChangeDeliveryAddress,
	handleChangeCardInfo,
	validationAllFields,
} = orderSlice.actions
