"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import {
  selectIsAuthenticated,
  selectIsLoading,
} from "@/redux/auth/authSelector";
import { currentUserThunk } from "@/redux/auth/authThunk";
import { Loader } from "./Loader";

interface PrivateRouteComponentProps {
  children: React.ReactNode;
}

export const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
  children,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        await dispatch(currentUserThunk()).unwrap();
      } catch (error: any) {
        router.push("/login");
      }
    };

    fetchCurrentUser();
  }, [dispatch, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
