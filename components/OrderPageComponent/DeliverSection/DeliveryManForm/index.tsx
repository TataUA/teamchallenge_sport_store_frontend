'use client'

import { useState } from "react"
import { useSelector } from "react-redux"
import { selectOrder } from "@/redux/order/orderSelector"

// components
import AnimatedLabelInputCustom from "@/components/Shared/AnimatedLabelInputCustom"
import SearchInputDropdown from "../SearchInputDropdown"

// utils
import { cn } from "@/services/utils/cn"
import { getListOfStreetsInCityNovaPoshta } from "@/services/api"

interface IProps {
  handleChangeDeliveryAddress: (propert:string, value: any)=>void
  deliveryAddress: any
}

interface Errors {
  street?: string;
  numberHouse?: string;
  numberAppartment?: string;
}

const DeliveryManForm = (props: IProps) => {
  const {handleChangeDeliveryAddress, deliveryAddress} = props

  const orderData = useSelector(selectOrder);

  const [errors, setErrors] = useState<Errors>({});

  const validateField = (id: string, value: string): string | undefined => {
    switch (id) {
      case 'street':
        if (!value) return "Вулиця обов'язкова";
        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄ0-9\s'-]+$/.test(value)) 
            return "Недійсна назва вулиці";
        if (!/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(value)) 
            return "Назва вулиці повинна містити хоча б одну літеру";
        if ((value.match(/\d/g) || []).length > 5) 
        return "Забагато цифр у назві вулиці";
        break;
      case 'numberHouse':
        if (!value) return "Номер будинку обов'язковий";
        if (!/^[0-9]+[A-Za-zа-яА-ЯіІїЇєЄ]?$/.test(value)) return "Недійсний номер будинку";
        break;
      case 'numberAppartment':
        if (value && !/^[0-9]+$/.test(value)) 
        return "Номер квартири повинен містити лише цифри";
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = event.target.value;
    const error = validateField(id, value);
    
    setErrors(prev => ({ ...prev, [id]: error }));
    handleChangeDeliveryAddress(id, value);
  };

  const errorClassname = "text-red text-sm mt-1";

  return (
    <div className="mt-2">
      <div className="mb-2">
        <SearchInputDropdown 
        onSelect={(value) => handleChangeDeliveryAddress('street', value)}
        onSearch={(query) => getListOfStreetsInCityNovaPoshta(orderData.city?.ref || '', query)} 
        />
      </div>
      <div className="mb-2">
        <AnimatedLabelInputCustom
          type="text" 
          value={deliveryAddress.numberHouse}
          placeholder="Номер будинку" 
          label="Номер будинку" 
          onChange={(event) => handleChange(event, 'numberHouse')}
        />
        {errors.numberHouse && <p className={errorClassname}>{errors.numberHouse}</p>}
      </div>
      <div className="mb-2">
        <AnimatedLabelInputCustom
          type="text" 
          value={deliveryAddress.numberAppartment}
          placeholder="Номер квартири" 
          label="Номер квартири" 
          onChange={(event) => handleChange(event, 'numberAppartment')}
        />
        {errors.numberAppartment && <p className={errorClassname}>{errors.numberAppartment}</p>}
      </div>
    </div>
  )
}

export default DeliveryManForm
