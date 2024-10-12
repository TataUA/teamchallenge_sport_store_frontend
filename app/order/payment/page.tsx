'use client'

import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import React from 'react'

declare var SDK_Button: any;

export default function Page(props: any) {
  const {searchParams} = props

  const router = useRouter();
  const [paymentForm, setPaymentForm] = useState('');

  useEffect(() => {
        if (searchParams.paymentForm) {
            const paymentForm = searchParams.paymentForm as string;
            if (typeof paymentForm === 'string') {
                const decodedForm = decodeURIComponent(paymentForm)
                    .replace(/\\"/g, '"')
                    .replace(/\n/g, '')
                    .replace(/>\s+</g, '><')
                    .trim();
                setPaymentForm(decodedForm);
            }
        }
    }, [searchParams]);

	return (
        <div className='p-6'>
          <Script
              src="https://static.liqpay.ua/libjs/sdk_button.js"
              strategy="afterInteractive"
              onLoad={()=>{
                (window as any).SDK_Button = SDK_Button;
                if (typeof SDK_Button !== 'undefined' && !customElements.get('sdk-button')) {
                  customElements.define('sdk-button', SDK_Button)
                }
              }}
          />
          <div className="flex justify-center items-center">
              <div dangerouslySetInnerHTML={{ __html: paymentForm || '' }}></div>
          </div>
        </div>
	)
}
