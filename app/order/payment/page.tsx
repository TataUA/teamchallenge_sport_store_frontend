'use client'

import AnimatedLabelInputCustom from "@/components/Shared/AnimatedLabelInputCustom";
import { cn } from "@/services/utils/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentPage = (props: any) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const router = useRouter();

  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{1,4}/g);
    
    return matches?.join(' ').substring(0, 19) || ''
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    const formattedInput = formatCardNumber(input);
    
    if(input.length === 20) {
      setCardNumberError('');
      return
    }
    
    if (formattedInput.trim() && formattedInput.trim() !== input) {
      setCardNumberError('Будь ласка, введіть тільки цифри');
    } else {
      setCardNumberError('');
    }

    setCardNumber(formattedInput);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formattedInput = input;
    
    if (input.length >= 2) {
      const month = parseInt(input.slice(0, 2));
      if (month < 1 || month > 12) {
        setExpiryDateError('Недійсний місяць');
      } else {
        setExpiryDateError('');
      }
      formattedInput = `${input.slice(0, 2)} / ${input.slice(2, 4)}`;
    } else {
      setExpiryDateError('');
    }

    if (input.length === 4) {
      const year = parseInt(input.slice(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      if (year < currentYear) {
        setExpiryDateError('Термін дії картки минув');
      }
    }

    setExpiryDate(formattedInput.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setCardNumberError('Номер картки повинен містити 16 цифр');
      return;
    }
    router.push('success');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 pt-0">
      <h1 className="text-xl text-title font-bold mb-4">Оплата замовлення</h1>
      <section className="flex-grow flex flex-col items-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="bg-blue bg-opacity-5 p-6 pt-[52px] pb-8 rounded-lg shadow-md w-full max-w-md mb-8">
              <h2 className="font-semibold mb-[52px] text-center text-title text-5xl leading-[52px]">9 857 грн</h2>
              <div className="mb-4">
                <AnimatedLabelInputCustom
                  classname={cn("mt-1 block w-full pb-2 shadow-sm",
                    'bg-transparent border-b-[1px] border-timer',
                    'focus:border-blue active:border-blue focus-within:border-blue focus-visible:border-blue outline-none',
                  )}
                  value={cardNumber}
                  placeholder={'Номер картки має містити 16 цифр'}
                  label={'Номер картки'} 
                  required
                  onChange={handleCardNumberChange}
                />
              </div>
              <div className="mb-4">
                <AnimatedLabelInputCustom
                  classname={cn("mt-1 block w-full pb-2 shadow-sm",
                    'bg-transparent border-b-[1px] border-timer',
                    'focus:border-blue active:border-blue focus-within:border-blue focus-visible:border-blue outline-none',
                  )}
                  value={expiryDate}
                  placeholder={'MM / YY'}
                  label={'Термін дії'} 
                  maxLength={7}
                  required
                  onChange={handleExpiryDateChange}
                />
              </div>
              <div>
                <AnimatedLabelInputCustom
                  classname={cn("mt-1 block w-full pb-2 shadow-sm",
                    'bg-transparent border-b-[1px] border-timer',
                    'focus:border-blue active:border-blue focus-within:border-blue focus-visible:border-blue outline-none',
                  )}
                  value={cvv}
                  placeholder={'CVV'}
                  label={'CVV'}
                  maxLength={3}
                  required 
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue text-white px-14 py-[16px] rounded-md text-base font-semibold
                hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Оплатити та оформити
            </button>
            {cardNumberError && (
              <p className="mt-2 text-center text-sm text-red">{cardNumberError}</p>
            )}
            {expiryDateError && <p className="mt-2 text-center text-sm text-red">{expiryDateError}</p>}
          </form>
      </section>
    </div>
  );
}

export default PaymentPage
