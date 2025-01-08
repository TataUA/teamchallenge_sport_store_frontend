"use client";

import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUserData,
} from "@/redux/auth/authSelector";
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

  const router = useRouter();
  const pathname = usePathname();

  const handleAuthRedirect = useCallback(() => {
    const containerWidth = window.innerWidth;

    if (pathname === "/auth/login" || pathname === "/auth/signup") {
      if (containerWidth >= 1440) {
        router.replace("/");
        return;
      }
      return;
    }

    if (pathname === "/order") {
      return;
    }

    if (!isAuthenticated || (isAuthenticated && !userData)) {
      router.replace(
        containerWidth < 1440
          ? "/auth/login"
          : pathname === "/auth/profile"
            ? "/"
            : "",
      );
    }
  }, [isAuthenticated, userData, pathname, router]);

  useEffect(() => {
    if (isLoading) return;

    handleAuthRedirect();

    const resizeHandler = () => {
      handleAuthRedirect();
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [handleAuthRedirect, isLoading]);

  useEffect(() => {
    if (
      isAuthenticated &&
      userData &&
      accessToken &&
      (pathname === "/auth/login" || pathname === "/auth/signup")
    ) {
      router.replace("/auth/profile");
    }
  }, [isAuthenticated, userData, accessToken, pathname, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
