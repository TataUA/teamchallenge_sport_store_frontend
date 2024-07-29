import Cookies from "js-cookie";
import { setToken } from "../api";

export const handleSetTokens = async (response: any, thunkApi: any) => {
  setToken(response.access);

  thunkApi.dispatch({
    type: "auth/updateAccessToken",
    payload: { accessToken: response.access },
  });

  Cookies.set("refreshToken", response.refresh, {
    expires: 40,
    secure: true,
    sameSite: "Strict",
  });

  return;
};
