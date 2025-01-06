// helpers
import getBasketIdFromLocalStorage, {
  setBasketIdToLocalStorage,
} from "./getBasketIdFromLocalStorage";

// service
import { createOrder, createPayment, IOrder } from "@/services/api";

// actions
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";

// types
import { ICartState } from "@/redux/cart/cartSlice";
import { IProductWithMaxQuantity } from "@/services/types";
import isValidShopingCart from "@/app/actions/isValidShopingCart";

const createOrderHelper = async (
  data: {
    userData: any;
    orderState: any;
    deliveryAddress: any;
    cart: ICartState;
  },
  successfulyRedirect: (data?: any) => void,
  showModalProductOutOfStock: (products: IProductWithMaxQuantity[]) => void,
): Promise<any> => {
  try {
    const { userData, orderState, deliveryAddress, cart } = data;

    const getOrCreateBasketId = async (): Promise<string> => {
      let basketId = getBasketIdFromLocalStorage();

      const isValid = await isValidShopingCart(basketId);

      if (!isValid) {
        basketId = await createShoppingCartAction();

        if (!basketId) {
          return "";
        }

        setBasketIdToLocalStorage(basketId);
      }

      return basketId;
    };

    const createNewOrder = (basketId: string): IOrder => {
      const fullAddressParts = orderState.city.split(",");
      return {
        basket_id: basketId,
        first_name: userData?.name,
        last_name: userData.patronymic,
        email: userData.email,
        surname: userData.surname,
        phone_number: userData.phone,
        delivery_method: orderState.deliveryType || "",
        branch: orderState.department || "",
        city: fullAddressParts[0] + "," + fullAddressParts[1] || "",
        appartment: deliveryAddress.numberAppartment,
        street: deliveryAddress.street,
        user: userData?.id || 0,
        payment_method: orderState.payment || "Upon Receipt",
      };
    };

    let basketId = await getOrCreateBasketId();
    let newOrder = createNewOrder(basketId);
    let response = await createOrder(newOrder);
    console.log("🚀 ~ response:", response)

    if (response.data.order) {
      if (orderState.payment !== "Card") {
        return successfulyRedirect();
      }
      
      const payment = await createPayment(response.data.order);

      return successfulyRedirect(payment.data);
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    console.error("Error in createOrderHelper:", error);
    throw error;
  }
};

export default createOrderHelper;
