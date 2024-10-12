"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import {
  selectIsAuthenticated,
  selectIsLoading,
} from "@/redux/auth/authSelector";

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

  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        router.replace("/auth/profile");
      }
    } else {
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        router.push(isMobile ? "" : "/");
      }
    }
  }, [isAuthenticated, isLoading, isMobile, router, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
