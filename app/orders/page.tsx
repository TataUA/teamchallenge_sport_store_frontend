import React from "react";

import ProfileLayout from "../ProfileLayout";
import RootLayout from "../layout";
import Link from "next/link";
import getWorkOnItIconSVG from "@/helpers/getWorkOnItIconSVG";

export default function MyOrders() {
  return (
    <ProfileLayout>
      <h1 className="md:hidden mt-4 mb-6 text-2xl leading-140 font-pangram font-bold text-title">
        Мої замовлення
      </h1>
      <div className="flex-1 w-full flex">
        <div className="flex-1 flex flex-col items-center justify-center gap-5 max-w-[412px] m-auto text-center">
          <div>{getWorkOnItIconSVG()}</div>
          <div>
            <h1 className="text-2xl text-title mb-2 font-bold">
              Ми працюємо над цією сторінкою!
            </h1>
            <h3 className="text-sm text-[#3E3E40] font-semibold">
              Історія замовлень буде доступна незабаром
            </h3>
          </div>
          <Link
            href="/"
            className="w-full rounded-xl text-center py-[12px] bg-blue text-base font-semibold text-white cursor-pointer hover:bg-active_blue"
          >
            На головну сторінку
          </Link>
        </div>
      </div>
    </ProfileLayout>
  );
}

MyOrders.getLayout = function getLayout(page: any) {
  return (
    <RootLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </RootLayout>
  );
};
