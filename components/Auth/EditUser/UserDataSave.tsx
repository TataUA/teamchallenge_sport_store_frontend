"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AppDispatch } from "@/redux/store";
import { selectUserData } from "@/redux/auth/authSelector";
import { logoutUserThunk } from "@/redux/auth/authThunk";
import success from "@/public/icons/auth/success_blue.svg";

interface UserDataSaveProps {
  setEditData: (edit: boolean) => void;
  showSuccessMessage: boolean;
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDataSave = (props: UserDataSaveProps) => {
  const user = useSelector(selectUserData);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    router.push("/");
  };

  return (
    <>
      {props.showSuccessMessage && (
        <div className="mb-6 flex flex-col justify-center items-center self-center">
          <Image src={success} alt="Синя галочка" className="w-14 h-14 mb-2" />
          <p className="text-sm font-normal text-label">
            Інформація успішно оновлена
          </p>
        </div>
      )}

      <div className="w-full mb-4 p-6 flex flex-col gap-5 rounded-xl bg-blue_trans5 overflow-hidden">
        <div className="flex">
          <label className="mr-4 label_read max-w-[45%] overflow-hidden">
            Ім&apos;я
            <input
              type="text"
              value={user?.name}
              readOnly
              className="input_read"
            />
          </label>

          <label className="label_read max-w-[45%] overflow-hidden">
            Прізвище
            <input
              type="text"
              value={user?.surname}
              readOnly
              className="input_read"
            />
          </label>
        </div>

        <label className="label_read">
          По-батькові
          <input
            type="text"
            value={user?.patronymic}
            readOnly
            className="w-full input_read"
          />
        </label>

        <label className="label_read">
          Електронна пошта
          <input
            type="text"
            value={user?.email}
            readOnly
            className="w-full input_read"
          />
        </label>

        <label className="label_read">
          Номер телефону
          <input
            type="text"
            value={user?.phone}
            readOnly
            className="w-full input_read"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => props.setEditData(true)}
        className="w-full h-12 mb-8 px-4 border rounded-xl border-blue   bg-white text-base font-semibold text-blue hover:bg-active_lightblue transition-all"
      >
        Редагувати
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full h-12 mb-8 px-4 border rounded-xl border-border_button bg-white text-base font-semibold text-common hover:border-border hover:bg-border_button transition-all"
      >
        Вихід
      </button>
    </>
  );
};
