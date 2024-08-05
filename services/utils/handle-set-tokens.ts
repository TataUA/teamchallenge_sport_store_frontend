import Cookies from "js-cookie";

export const handleSetTokens = async (response: any) => {
  localStorage.setItem("accessToken", response.access);

  Cookies.set("refreshToken", response.refresh, {
    expires: 40,
    secure: true,
    sameSite: "Strict",
  });

  return;
};
