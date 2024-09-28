import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import getBasketIdFromLocalStorage, { setBasketIdToLocalStorage } from "./getBasketIdFromLocalStorage";
import { createOrder, IOrder } from "@/services/api";
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";
import { IProduct } from "@/services/types";

const createOrderHelper = async (data: any, callback: () => void) => {
  const {userData, orderState, deliveryAddress, cart} = data

    let basketId = getBasketIdFromLocalStorage();
      if(!basketId) {
        const newBasket = await createShoppingCartAction()

        basketId = newBasket.basketId
        setBasketIdToLocalStorage(basketId)
      }

      const newOrder: IOrder = {
        basket_id: basketId,
        first_name: userData?.name,
        last_name: userData.patronymic,
        email: userData.email,
        surname: userData.surname,
        phone_number: userData.phone,
        delivery_method: orderState.deliveryType || '',
        branch: orderState.department || '',
        city: orderState.city || '',
        appartment: deliveryAddress.numberAppartment,
        street: deliveryAddress.street,
        user: userData?.id || 0,
        payment_method: orderState.payment || 'Upon Receipt',
      }

      const response = await createOrder(newOrder)

      if(response?.msg?.includes('Basket does not exist') || response?.msg?.includes('You cannot place an order from someone')) {
        localStorage.removeItem('basketId')
        const newBasket = await createShoppingCartAction()
        
        setBasketIdToLocalStorage(newBasket.basketId)
        newOrder.basket_id = newBasket.basketId;

        cart.products.forEach(async (product: IProduct) => {
          await addProductToCartInDbAction(
            newBasket.basketId,
            product,
          );
          
        });

        setTimeout(()=>{
          createOrder(newOrder)
          callback()
          return
        }, 500)
      } 

      if(response?.msg?.includes('Your basket is empty')) {
        cart.products.forEach(async (product: IProduct) => {
          await addProductToCartInDbAction(
            basketId,
            product,
          );
        });

        setTimeout(()=>{
          createOrder(newOrder)
          callback()
          return
        }, 500)
      }

      if(response?.msg?.includes('Congratulations')) {
        callback()
        return
      }
}

export default createOrderHelper;
