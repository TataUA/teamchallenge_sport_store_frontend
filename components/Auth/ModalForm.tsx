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

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyboardCloseForm);
    return () => {
      document.body.style.overflow = "";
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
            "relative w-auto max-h-[96vh] p-6 1440:p-10 bg-white rounded-lg shadow-lg overflow-y-auto",
            props.stylesContentBlock,
          )}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
        >
          <div className="absolute top-6 1440:top-10 right-6 1440:right-10">
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
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};
