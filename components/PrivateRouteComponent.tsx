"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectIsRefreshing,
  selectUserData,
} from "@/redux/auth/authSelector";
import { setAccessToken } from "@/redux/auth/authSlice";
import { currentUserThunk } from "@/redux/auth/authThunk";
import { Loader } from "./Loader";

interface PrivateRouteComponentProps {
  children: React.ReactNode;
}

export const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUserData);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const fetchAccessToken = useCallback(async () => {
    try {
      const tokenLocalStorage = localStorage.getItem("persist:auth");

      if (tokenLocalStorage) {
        const authState = JSON.parse(tokenLocalStorage);
        const persistedAccessToken = authState.accessToken;

        if (persistedAccessToken !== null && persistedAccessToken !== "null") {
          dispatch(setAccessToken(persistedAccessToken));
        } else {
          router.push("/login");
        }
      }
    } catch (error: any) {
      router.push("/login");
      throw new Error(error);
    } finally {
      setIsInitialized(true);
    }
  }, [dispatch, router]);

  useEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (isAuthenticated && isInitialized && !user) {
          await dispatch(currentUserThunk()).unwrap();
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        router.push("/login");
      }
    };

    if (isAuthenticated && isInitialized) {
      fetchCurrentUser();
    }
  }, [dispatch, router, isAuthenticated, isInitialized, user]);

  if (isLoading || isRefreshing || !isInitialized) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
};
