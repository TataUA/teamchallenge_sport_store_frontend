'use client'

// core
import Image from "next/image";
// assets
import wrong from "@/public/icons/auth/wrong.svg";

// utils
import { cn } from "@/services/utils/cn";

// types
import { IntInitialStateOrder } from "..";

interface IProps {
  orderState: IntInitialStateOrder, 
  submitted: boolean, 
  setOrderState: (e: any)=>void
  handleChangeOrder: (propert:keyof IntInitialStateOrder, value: string)=>void
}

const PaymentSection = (props: IProps) => {
  const {orderState, submitted, handleChangeOrder} = props
  
  const checkboxClassname = cn(
    "w-[18px] h-[18px] mt-[3px] mr-2 rounded-[6px] border-[1px] outline-none border-[#868687]",
    "md:w-5 md:h-5",
    "appearance-none checked:bg-blue checked:border-0",
    "relative peer",
  );
  const labelCheckboxClassname = "flex gap-2 items-start"
  const titleCheckboxClassname = "text-sm text-[#272728] font-medium"

  return (
    <div className="md:col-start-1 md:row-start-3 mb-[40px] md:mb-[48px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#1A1A1C] text-xl font-semibold min-[2800px]:lg:text-5xl">
          Оплата
        </h3>
        {!orderState.payment && submitted ? (
          <div className="flex gap-2 items-center">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
            <span className="min-w-min whitespace-nowrap h-max-content text-red text-xs">
              Оберіть метод оплати
            </span>
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={labelCheckboxClassname}>
          <input
            className={checkboxClassname}
            type="checkbox"
            id="cash"
            name="cash"
            value="cash"
            checked={orderState.payment === "Upon Receipt"}
            onChange={() => handleChangeOrder("payment", "Upon Receipt")}
          />
          <svg
            className="
                absolute 
                w-4 h-4 ml-[2px]
                md:w-5 md:h-5 md:ml-0
                hidden peer-checked:block stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M14.0323 5.4074C13.9626 5.3371 13.8797 5.2813 13.7883 5.24323C13.6969 5.20515 13.5988 5.18555 13.4998 5.18555C13.4008 5.18555 13.3028 5.20515 13.2114 5.24323C13.12 5.2813 13.0371 5.3371 12.9673 5.4074L7.37984 11.0024L5.03234 8.6474C4.95995 8.57747 4.87449 8.52248 4.78085 8.48558C4.68721 8.44868 4.58722 8.43058 4.48658 8.43232C4.38595 8.43406 4.28664 8.45561 4.19433 8.49573C4.10202 8.53585 4.01852 8.59376 3.94859 8.66615C3.87866 8.73854 3.82368 8.82399 3.78677 8.91763C3.74987 9.01128 3.73177 9.11127 3.73351 9.2119C3.73525 9.31254 3.7568 9.41185 3.79692 9.50416C3.83704 9.59646 3.89495 9.67997 3.96734 9.7499L6.84734 12.6299C6.91706 12.7002 7.00001 12.756 7.09141 12.7941C7.1828 12.8321 7.28083 12.8517 7.37984 12.8517C7.47885 12.8517 7.57688 12.8321 7.66827 12.7941C7.75967 12.756 7.84262 12.7002 7.91234 12.6299L14.0323 6.5099C14.1085 6.43966 14.1692 6.35443 14.2108 6.25955C14.2523 6.16468 14.2738 6.06222 14.2738 5.95865C14.2738 5.85507 14.2523 5.75262 14.2108 5.65774C14.1692 5.56287 14.1085 5.47763 14.0323 5.4074Z"
              fill="white"
            />
          </svg>
          <div className="flex flex-col">
            <span className={titleCheckboxClassname}>
              Оплата при отриманні замовлення
            </span>
            <span className="text-xs text-[#868687] font-inter">
              Комісія 20грн + 3.2% від суми замовлення
            </span>
          </div>
        </label>
      </div>
      <div>
        <label className={labelCheckboxClassname}>
          <input
            className={checkboxClassname}
            type="checkbox"
            id="card"
            name="card"
            value="card"
            checked={orderState.payment === "Card"}
            onChange={() => handleChangeOrder("payment", "Card")}
          />
          <svg
            className="
              absolute 
              w-4 h-4 ml-[2px]
              md:w-5 md:h-5 md:ml-0
              hidden peer-checked:block stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M14.0323 5.4074C13.9626 5.3371 13.8797 5.2813 13.7883 5.24323C13.6969 5.20515 13.5988 5.18555 13.4998 5.18555C13.4008 5.18555 13.3028 5.20515 13.2114 5.24323C13.12 5.2813 13.0371 5.3371 12.9673 5.4074L7.37984 11.0024L5.03234 8.6474C4.95995 8.57747 4.87449 8.52248 4.78085 8.48558C4.68721 8.44868 4.58722 8.43058 4.48658 8.43232C4.38595 8.43406 4.28664 8.45561 4.19433 8.49573C4.10202 8.53585 4.01852 8.59376 3.94859 8.66615C3.87866 8.73854 3.82368 8.82399 3.78677 8.91763C3.74987 9.01128 3.73177 9.11127 3.73351 9.2119C3.73525 9.31254 3.7568 9.41185 3.79692 9.50416C3.83704 9.59646 3.89495 9.67997 3.96734 9.7499L6.84734 12.6299C6.91706 12.7002 7.00001 12.756 7.09141 12.7941C7.1828 12.8321 7.28083 12.8517 7.37984 12.8517C7.47885 12.8517 7.57688 12.8321 7.66827 12.7941C7.75967 12.756 7.84262 12.7002 7.91234 12.6299L14.0323 6.5099C14.1085 6.43966 14.1692 6.35443 14.2108 6.25955C14.2523 6.16468 14.2738 6.06222 14.2738 5.95865C14.2738 5.85507 14.2523 5.75262 14.2108 5.65774C14.1692 5.56287 14.1085 5.47763 14.0323 5.4074Z"
              fill="white"
            />
          </svg>
          <span className={titleCheckboxClassname}>Оплата карткою</span>
        </label>
      </div>
    </div>
  );
}

export default PaymentSection
