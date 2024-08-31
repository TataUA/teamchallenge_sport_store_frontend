// core
import { useDispatch, useSelector } from "react-redux";

// selector
import { selectOrder } from "@/redux/order/orderSelector";

// actions
import { handleChangeDeliveryAddress } from "@/redux/order/orderSlice";

// utils
import { cn } from "@/services/utils/cn"

const DeliveryManForm = () => {
  const dispatch = useDispatch()

  const {deliveryAddress} = useSelector(selectOrder)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
      dispatch(handleChangeDeliveryAddress({value: event.target.value, id}))
  };

  const inputClassname = cn("w-full px-0 py-2 pt-5 border-b-[1px] border-[#CFCFCF] text-base font-medium text-[#868687]",
    "outline-none focus:border-blue "
   )
  return (
    <div className="mt-2">
      <div className="mb-2">
        <input 
          className={inputClassname}
          type="text" 
          value={deliveryAddress.street}
          placeholder="Вулиця" 
          onChange={(event) => handleChange(event, 'street')}
        />
      </div>
      <div className="mb-2">
        <input 
          className={inputClassname}
          value={deliveryAddress.numberHouse}
          type="text" 
          placeholder="Номер будинку" 
          onChange={(event) => handleChange(event, 'numberHouse')}
        />
      </div>
      <div className="mb-2">
        <input 
          className={inputClassname}
          value={deliveryAddress.numberAppartment}
          type="text" 
          placeholder="Номер квартири" 
          onChange={(event) => handleChange(event, 'numberAppartment')}
        />
      </div>
    </div>
  )
}

export default DeliveryManForm
