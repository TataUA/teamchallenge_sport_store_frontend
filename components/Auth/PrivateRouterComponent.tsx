"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUserData,
} from "@/redux/auth/authSelector";
import { AppDispatch } from "@/redux/store";
import { logoutUserThunk } from "@/redux/auth/authThunk";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Loader } from "@/components/Loader";

interface PrivateRouteComponentProps {
  children: React.ReactNode;
}

export const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
  children,
}) => {
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userData = useSelector(selectUserData);
  const accessToken = localStorage.getItem("accessToken");

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && !accessToken) {
      dispatch(logoutUserThunk());
      router.replace(isMobile ? "/auth/login" : "/");
      return;
    }

    if (!isAuthenticated) {
      if (pathname === "/auth/login") {
        router.replace(isMobile ? "/auth/login" : "/");
      } else if (pathname === "/auth/signup") {
        router.replace(isMobile ? "/auth/signup" : "/");
      }
    } else if (isAuthenticated && userData && accessToken) {
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        router.replace("/auth/profile");
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    userData,
    isMobile,
    router,
    dispatch,
    pathname,
    accessToken,
  ]);

  if (
    !isMobile &&
    (pathname === "/auth/login" || pathname === "/auth/signup")
  ) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};