// core
import React, {  ReactNode } from "react";
import Image from "next/image";

// assets
import success from "@/public/icons/success_blue.svg";

interface SuccessRegisterModalProps {
  showSuccessModal: boolean;
  children: ReactNode
}

const UserDataWasSuccessEdited = (props: SuccessRegisterModalProps) => {
  return (
    <div>
      {props.showSuccessModal && (
        <div className="fixed w-full h-screen top-0 left-0 p-6 flex justify-center content-center bg-blured">
          <div className="w-full flex flex-col justify-center items-center self-center px-6 py-8 rounded-3xl bg-white">
            <Image src={success} alt="Синя галочка" className="mb-4" />
            <h1 className="mb-1 text-xl font-bold text-title">Вітаємо!</h1>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataWasSuccessEdited
