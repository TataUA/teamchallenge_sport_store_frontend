"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";
import {
  selectIsAuthenticated,
  selectIsLoading,
} from "@/redux/auth/authSelector";
import { Loader } from "@/components/Loader";

interface PrivateRouteComponentProps {
  children: React.ReactNode;
}

export const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
  children,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const router = useRouter();
  const pathname = usePathname();

  useFetchCurrentUser();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        router.push("/auth/profile");
      }
    } else {
      if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
