"use client";

import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import success from "@/public/icons/success_blue.svg";

interface SuccessRegisterModalProps {
  showSuccessModal: boolean;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
}

export const SuccessRegisterModal = (props: SuccessRegisterModalProps) => {
  return (
    <div>
      {props.showSuccessModal && (
        <div className="fixed w-full h-screen top-0 left-0 p-6 flex justify-center content-center bg-blured">
          <div className="w-85 flex flex-col justify-center items-center self-center px-6 py-8 rounded-3xl bg-white">
            <Image src={success} alt="Синя галочка" className="mb-4" />
            <h1 className="mb-1 text-xl font-bold text-title">Вітаємо!</h1>
            <p className="mb-6 text-sm font-medium text-common">
              Ваш профіль був успішно створений
            </p>
            <Link
              href={"/login"}
              onClick={() => props.setShowSuccessModal(false)}
              className="w-full h-12 px-4 py-2 block text-center  border border-blue rounded-xl  bg-white text-base font-semibold text-blue hover:bg-blue hover:text-white transition-all"
            >
              На сторінку входу
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
