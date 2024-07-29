import Cookies from "js-cookie";
import { updateAccessTokenThunk } from "@/redux/auth/authThunk";
import { logoutUser } from "@/redux/auth/authSlice";
import { clearToken } from "../api";

export const handleTokenError = async (error: any, thunkApi: any) => {
  if (error.detail === "Given token not valid for any token type") {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      try {
        await thunkApi
          .dispatch(updateAccessTokenThunk({ refreshToken }))
          .unwrap();

        return true;
      } catch (refreshError: any) {
        thunkApi.dispatch(logoutUser());

        clearToken();
        Cookies.remove("refreshToken");

        return thunkApi.rejectWithValue({
          message: refreshError.detail || "An error occurred",
        });
      }
    } else {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue({
        message: ["Refresh token is missing"],
      });
    }
  }
  return false;
};
