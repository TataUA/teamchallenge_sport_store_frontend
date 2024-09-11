// utils
import { cn } from "@/services/utils/cn"

interface IProps {
   handleChangeDeliveryAddress: (propert:string, value: any)=>void
   deliveryAddress: any
}

const DeliveryManForm = (props: IProps) => {
  const {handleChangeDeliveryAddress, deliveryAddress} = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
      handleChangeDeliveryAddress(id, event.target.value)
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
