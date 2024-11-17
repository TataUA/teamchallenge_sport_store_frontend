import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch } from "@/redux/store";
import { currentUserThunk } from "@/redux/auth/authThunk";
import { selectUserData } from "@/redux/auth/authSelector";

export const useFetchCurrentUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const mounted = useRef<boolean>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken || mounted.current) return;

    const fetchUser = async () => {
      try {
        await dispatch(currentUserThunk()).unwrap();
      } catch (error) {
        console.log(error);
        //router.push("/auth/login");
      }
    };

    if (!userData) {
      fetchUser();
      mounted.current = true;
    }
  }, [dispatch, userData]);
};
