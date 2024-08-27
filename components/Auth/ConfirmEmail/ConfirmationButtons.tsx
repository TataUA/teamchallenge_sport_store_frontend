"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { resendEmailThunk } from "@/redux/auth/authThunk";
import { Button } from "@/components/Button/Button";

export const ConfirmationButtons = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleResendEmail = async () => {
    if (countdown === null) {
      setCountdown(10); // 60с

      try {
        await dispatch(resendEmailThunk({ email })).unwrap();
      } catch (error) {
        console.error("Resend email failed in catch block:", error);
      }

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) return prev - 1;
          clearInterval(interval);
          return null;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        type="submit"
        subtype="primary"
        title={
          countdown !== null
            ? `${formatTime(countdown)}`
            : "Надіслати лист повторно"
        }
        onClick={handleResendEmail}
        disabled={countdown !== null}
      />
      <Button
        type="button"
        subtype="secondary"
        title="На сторіку входу"
        onClick={handleRedirect}
      />
    </div>
  );
};
