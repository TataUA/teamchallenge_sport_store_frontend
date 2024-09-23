"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { Button } from "@/components/Button/Button";

interface ConfirmationButtonsProps {
  email: string;
  resendButtonTitle: string;
  actionThunk: (data: { email: string }) => any;
}

export const ConfirmationButtons = ({
  email,
  resendButtonTitle,
  actionThunk,
}: ConfirmationButtonsProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleResend = async () => {
    if (countdown === null) {
      setCountdown(60);

      try {
        await dispatch(actionThunk({ email })).unwrap();
      } catch (error) {
        console.error("Resend action failed in catch block:", error);
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
          countdown !== null ? `${formatTime(countdown)}` : resendButtonTitle
        }
        onClick={handleResend}
        disabled={countdown !== null}
      />
      <Button
        type="button"
        subtype="tertiary"
        title="На сторіку входу"
        onClick={handleRedirect}
      />
    </div>
  );
};
