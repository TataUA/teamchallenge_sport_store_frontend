"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/services/utils/cn";
import { AppDispatch } from "@/redux/store";
import { confirmedEmailThunk } from "@/redux/auth/authThunk";
import { selectError, selectIsLoading } from "@/redux/auth/authSelector";
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

  useEffect(() => {
    dispatch(confirmedEmailThunk({ confirmationToken: tokenValue }));
  }, [dispatch, tokenValue]);

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={cn(
            "container",
            "w-full flex flex-col justify-center items-center self-center text-center font-pangram",
          )}
        >
          {!error ? (
            <>
              <Image
                src={envelopSuccess}
                alt="Синій конверт з зеленою галочкою"
                className="h-[152px] w-[152px] mt-[164px] mb-8"
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
                className="h-[152px] w-[152px] mt-[164px] mb-8"
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
            title="На сторіку входу"
            onClick={handleRedirect}
          />
        </div>
      )}
    </>
  );
};
