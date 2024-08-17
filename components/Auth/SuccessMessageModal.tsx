"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resetRegistrationStatus } from "@/redux/auth/authSlice";
import { Button } from "@/components/Button/Button";
import success from "@/public/icons/success_blue.svg";

interface SuccessMessageModalProps {
  title: string;
  text: string;
  titleButton: string;
  redirectButton: string;
  showSuccessModal: boolean;
}

export const SuccessMessageModal = (props: SuccessMessageModalProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRedirect = () => {
    dispatch(resetRegistrationStatus());
    router.push(props.redirectButton);
  };

  return (
    <>
      {props.showSuccessModal && (
        <div className="fixed w-full h-screen top-0 left-0 p-6 flex justify-center content-center bg-blured">
          <div className="w-85 flex flex-col justify-center items-center self-center px-6 py-8 rounded-3xl bg-white">
            <Image src={success} alt="Синя галочка" className="mb-4" />
            <h1 className="mb-1 text-xl font-bold text-title">{props.title}</h1>
            <p className="mb-6 text-sm font-medium text-common">{props.text}</p>
            <Button
              type="button"
              subtype="secondary"
              title={props.titleButton}
              onClick={handleRedirect}
            />
          </div>
        </div>
      )}
    </>
  );
};
