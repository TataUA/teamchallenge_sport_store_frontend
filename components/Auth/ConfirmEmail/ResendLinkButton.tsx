"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch } from "@/redux/store";
import { resetPasswordRequestThunk } from "@/redux/auth/authThunk";

import { Button } from "@/components/Button/Button";

interface ResendLinkButtonProps {
  email: string;
  resendButtonTitle: string;
}

export const ResendLinkButton = (props: ResendLinkButtonProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval);
          return null;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    setCountdown(60);
    const cleanup = startCountdown();

    return cleanup;
  }, []);

  const handleResend = async () => {
    if (countdown === null) {
      setCountdown(60);
      startCountdown();

      try {
        await dispatch(
          resetPasswordRequestThunk({ email: props.email }),
        ).unwrap();
      } catch (error) {
        console.error("Resend action failed in catch block:", error);
      }
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
    <div>
      <Button
        type="submit"
        subtype="primary"
        title={
          countdown !== null
            ? `${formatTime(countdown)}`
            : props.resendButtonTitle
        }
        onClick={handleResend}
        disabled={countdown !== null}
      />
    </div>
  );
};
