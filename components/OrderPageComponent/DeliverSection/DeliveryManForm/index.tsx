'use client'

import AnimatedLabelInputCustom from "@/components/Shared/AnimatedLabelInputCustom"
// utils
import { cn } from "@/services/utils/cn"
import { useState } from "react"

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

  const inputClassname = cn("w-full px-0 py-2 pt-5 border-b-[1px] border-[#CFCFCF] text-base font-medium text-[#868687]",
    "outline-none focus:border-blue "
  )

  const errorClassname = "text-red text-sm mt-1";

  return (
    <div className="mt-2">
      <div className="mb-2">
        <AnimatedLabelInputCustom
          classname={inputClassname}
          type="text" 
          value={deliveryAddress.street}
          placeholder="Вулиця" 
          label="Вулиця" 
          onChange={(event) => handleChange(event, 'street')}
        />
        {errors.street && <p className={errorClassname}>{errors.street}</p>}
      </div>
      <div className="mb-2">
        <AnimatedLabelInputCustom
          classname={inputClassname}
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
          classname={inputClassname}
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
