'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentPage = (props: any) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const router = useRouter();

  const [cardNumberError, setCardNumberError] = useState('');

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
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Номер картки
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9123 5678"
                  required
                  className={("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50")}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Термін дії
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      setExpiryDate(value.replace(/(\d{2})(\d{0,2})/, '$1 / $2').trim());
                    }
                  }}
                  placeholder="MM / YY"
                  maxLength={7}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
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
          </form>
      </section>
    </div>
  );
}

export default PaymentPage
