import React, { useState, useEffect, useRef } from "react";

import { cn } from "@/services/utils/cn";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wrapperClassname?: string;
}

const ResponsiveModal = ({
  isOpen,
  onClose,
  children,
  wrapperClassname,
}: IProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      if (document.body.style.overflow === "hidden")
        document.body.style.overflow = "unset";
      setCurrentY(0);
    }

    return () => {
      if (document.body.style.overflow === "hidden")
        document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      setCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > window.innerHeight * 0.5) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };

  if (!isOpen) return null;

  const modalStyle = isMobile ? { transform: `translateY(${currentY}px)` } : {};

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center",
        `${isMobile ? "items-end" : "items-center"}`,
      )}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full",
          `${isMobile ? "max-w-full" : "max-w-lg"}`,
        )}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {isMobile && (
          <div className="h-10 p-5 absolute z-30 bottom-[100%] left-[50%] transform translate-x-[-50%]">
            <div
              className="w-14 h-1 bg-white rounded mx-auto mb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        )}
        <div
          className={cn(
            "bg-white p-6 pt-0 w-full max-w-lg max-h-[85vh] overflow-y-auto",
            `${isMobile ? "max-w-full" : "max-w-lg"}`,
            `${
              isMobile
                ? "rounded-t-3xl h-auto transition-transform duration-300 ease-out"
                : "rounded-lg"
            }`,
            "md: pt-6",
            `${wrapperClassname?.length ? wrapperClassname : ""}`,
          )}
        >
          {!isMobile ? (
            <button
              className="float-right text-2xl bg-transparent border-none cursor-pointer"
              onClick={onClose}
            >
              &times;
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;
