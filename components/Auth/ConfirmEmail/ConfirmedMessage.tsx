"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { AppDispatch } from "@/redux/store";
import { confirmedEmailThunk } from "@/redux/auth/authThunk";
import { selectError, selectIsLoading } from "@/redux/auth/authSelector";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button/Button";
import envelopSuccess from "@/public/icons/auth/envelop_blue_success.svg";
import envelopReject from "@/public/icons/auth/envelop_blue_reject.svg";

export const ConfirmedMessage = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const pathname = usePathname();

  const tokenValue = pathname.substring(22, pathname.length);

  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(confirmedEmailThunk({ confirmationToken: tokenValue }));
  }, [dispatch, tokenValue]);

  const handleRedirect = () => {
    if (isMobile) {
      router.push("/auth/login");
    } else router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container 1440:h-full 1440:flex items-center justify-center">
          <div className=" w-full 1440:w-[504px] 1440:my-4 flex flex-col justify-center items-center self-center text-center font-pangram 1440:p-10 1440:border 1440:border-border 1440:rounded-lg 1440:shadow-lg">
            {!error ? (
              <>
                <Image
                  src={envelopSuccess}
                  alt="Синій конверт з зеленою галочкою"
                  className="h-[152px] w-[152px] mt-[164px] 1440:mt-0 mb-8"
                />
                <h1 className="mb-4 font-bold text-2xl leading-140 text-title">
                  Електронна пошта підтвреджена
                </h1>
                <p className="mb-12 font-medium text-sm text-common">
                  Ваша електронна пошта була підтверджена та профіль успішно
                  створено
                </p>
              </>
            ) : (
              <>
                <Image
                  src={envelopReject}
                  alt="Синій конверт з червоним хрестиком"
                  className="h-[152px] w-[152px] mt-[164px] 1440:mt-0 mb-8"
                />
                <h1 className="mb-4 font-bold text-2xl leading-140 text-title">
                  Посилання більше не дійсне
                </h1>
                <p className="mb-12 font-medium text-sm text-common">
                  Ой! Це посилання більше не дійсне. Авторизуйтесь і отримаєте
                  посилання на підтвердження повторно
                </p>
              </>
            )}

            <Button
              type="button"
              subtype="primary"
              title={isMobile ? "На сторіку входу" : "На головну сторінку"}
              onClick={handleRedirect}
            />
          </div>
        </div>
      )}
    </>
  );
};
