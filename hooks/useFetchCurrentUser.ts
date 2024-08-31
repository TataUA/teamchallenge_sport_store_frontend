import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { currentUserThunk } from "@/redux/auth/authThunk";
import { selectUserData } from "@/redux/auth/authSelector";

export const useFetchCurrentUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        await dispatch(currentUserThunk()).unwrap();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!userData) {
      fetchUser();
    }
  }, [dispatch, userData]);
};
