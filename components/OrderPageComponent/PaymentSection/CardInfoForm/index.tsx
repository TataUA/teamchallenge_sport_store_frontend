// core
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

// selector
import { selectOrder } from "@/redux/order/orderSelector";

// actions
import { handleChangeCardInfo } from "@/redux/order/orderSlice";

// utils
import { cn } from "@/services/utils/cn";

// assets
import wrong from "@/public/icons/wrong.svg";

const CardInfoForm = () => {
  const dispatch = useDispatch()

  const {cardInfo} = useSelector(selectOrder)

  
  const formatCardNumber = (value: string) => {
    return value
        .replace(/\s+/g, '') // Remove any existing spaces
        .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
        .trim(); // Remove trailing space
};

  const formatExpiryDate = (value: string) => {
    const cleanedValue = value.replace(/\D+/g, ''); // Remove any non-digit characters
    if (cleanedValue.length <= 2) {
        return cleanedValue;
    }
    return `${cleanedValue.substring(0, 2)}/${cleanedValue.substring(2, 4)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(name === 'numberCard') {
      dispatch(handleChangeCardInfo({value: (value), name}))
      return
    }
    if(name === 'expire') {
      dispatch(handleChangeCardInfo({value: (value), name}))
      return
    }
    dispatch(handleChangeCardInfo({value, name}))
  };

  const inputClassname = cn("w-full px-0 py-2 pt-5 border-b-[1px] border-[#CFCFCF] text-base font-medium text-[#868687]",
    "outline-none focus:border-blue", {}
   )

   console.log(cardInfo.numberCard.length);
   
  return (
    <div className="mt-2 flex flex-wrap justify-between gap-2">
      <div className={`mb-2 flex-[100%] relative ${cardInfo.numberCard.length < 19 ? '[&>input]:border-red [&>input]:placeholder-red [&>input]:text-red' : ''}`}>
        <input 
          className={inputClassname}
          type="text" 
          value={formatCardNumber(cardInfo.numberCard)}
          placeholder="Номер картки" 
          maxLength={19}
          name='numberCard'
          onChange={handleChange}
        />
        {(cardInfo.numberCard.length < 19) ? (
          <div className="flex gap-2 items-center">
            <Image className="absolute right-2 top-[50%]" src={wrong} width={18} height={18} alt="Іконка помилки" />
            <span
                className='min-w-min whitespace-nowrap h-max-content text-red text-xs'
            >
              Номер картки має містити 16 цифр
            </span>
          </div>
        ) : null}
      </div>
      <div className={`mb-2 flex-[48%] relative ${cardInfo.expire.length < 5 ? '[&>input]:border-red [&>input]:placeholder-red [&>input]:text-red' : ''}`}>
        <input 
          className={inputClassname}
          value={formatExpiryDate(cardInfo.expire)}
          type="text" 
          placeholder="Термін дії"
          maxLength={5} 
          name='expire'
          onChange={handleChange}
        />
        {(cardInfo.expire.length < 5) ? (
          <div className="absolute right-2 top-[50%]">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
          </div>
        ) : null}
      </div>
      <div className={`mb-2 flex-[48%] relative ${cardInfo.cvv.length < 3 ? '[&>input]:border-red [&>input]:placeholder-red [&>input]:text-red' : ''}`}>
        <input 
          className={inputClassname}
          value={cardInfo.cvv}
          type="text"
          maxLength={3} 
          placeholder="CVV" 
          name='cvv'
          onChange={handleChange}
        />
        {(cardInfo.cvv.length < 3) ? (
          <div className="absolute right-2 top-[50%]">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CardInfoForm
