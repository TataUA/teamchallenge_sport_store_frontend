'use client'

import { logoutUserThunk } from "@/redux/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    router.push("/");
  };

  return handleLogout;
};

export default useLogout;
