'use client'

import Link from "next/link";
// import { useState } from "react";

export default function Resetpassword() {

    // const [showMessage, setShowMessage] = useState<boolean>(false);

  return (
    <div className="w-full h-screen bg-white p-6 pt-0 flex flex-row justify-center items-center">
      <div className="flex flex-col items-center gap-y-12">
        <svg width="142" height="116" viewBox="0 0 142 116" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M124.643 17.6567C127.113 20.1267 127.113 24.0533 124.643 26.5233L52.8234 98.3433C52.2438 98.9301 51.5535 99.3959 50.7924 99.7138C50.0314 100.032 49.2149 100.195 48.3901 100.195C47.5653 100.195 46.7488 100.032 45.9878 99.7138C45.2268 99.3959 44.5364 98.9301 43.9568 98.3433L17.3568 71.7433C16.77 71.1637 16.3042 70.4733 15.9863 69.7123C15.6684 68.9513 15.5046 68.1348 15.5046 67.31C15.5046 66.4852 15.6684 65.6687 15.9863 64.9077C16.3042 64.1466 16.77 63.4563 17.3568 62.8767C17.9364 62.2899 18.6268 61.8241 19.3878 61.5062C20.1488 61.1883 20.9653 61.0245 21.7901 61.0245C22.6149 61.0245 23.4314 61.1883 24.1924 61.5062C24.9534 61.8241 25.6438 62.2899 26.2234 62.8767L48.3901 85.0433L115.777 17.6567C116.356 17.0699 117.047 16.6041 117.808 16.2862C118.569 15.9683 119.385 15.8045 120.21 15.8045C121.035 15.8045 121.851 15.9683 122.612 16.2862C123.373 16.6041 124.064 17.0699 124.643 17.6567ZM111.28 4.22999L48.3901 67.12L30.7201 49.45C25.7801 44.51 17.7368 44.51 12.7968 49.45L3.9301 58.3167C-1.0099 63.2567 -1.0099 71.3 3.9301 76.24L39.3968 111.707C44.3368 116.647 52.3801 116.647 57.3201 111.707L138.07 31.02C143.01 26.08 143.01 18.0367 138.07 13.0967L129.203 4.22999C124.2 -0.710006 116.22 -0.710006 111.28 4.22999Z" fill="#0A4CF6"/>
        </svg>
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-title font-bold text-heading">Пароль змінено</p>
          <p className="text-common font-medium text-basic text-center">Ваш пароль успішно змінено. Використовуйте новий пароль щоб увійти</p>
        </div>
          <Link href="/login" className="h-12 text-button text-blue bg-white rounded-button w-full font-semibold border-2 border-blue flex flex-row justify-center items-center">
            На сторінку входу
          </Link>
      </div>
    </div>
  );
}