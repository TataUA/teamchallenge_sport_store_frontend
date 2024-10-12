"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import close from "@/public/icons/close_icon.svg";

import { cn } from "@/services/utils/cn";

interface ModalFormProps {
  children: React.ReactNode;
  onClose: () => void;
  stylesContentBlock?: string;
}

export const ModalForm = (props: ModalFormProps) => {
  useEffect(() => {
    const handleKeyboardCloseForm = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", handleKeyboardCloseForm);
    return () => {
      window.removeEventListener("keydown", handleKeyboardCloseForm);
    };
  }, [props]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => {
          props.onClose();
        }}
      >
        <div
          className={cn(
            "relative w-full p-6 1440:p-10 bg-white rounded-lg shadow-lg",
            props.stylesContentBlock,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-10 right-10">
            <button
              type="button"
              onClick={() => {
                props.onClose();
              }}
            >
              <Image
                src={close}
                alt="Хрестик закриття форми"
                width={26}
                height={26}
              />
            </button>
          </div>
          <div className="w-full">{props.children}</div>
        </div>
      </div>
    </>
  );
};
