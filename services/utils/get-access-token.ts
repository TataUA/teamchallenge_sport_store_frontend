export const getTokenFromLocalStorage = () => {
  const tokenLocalStorage = localStorage.getItem("persist:auth");

  if (tokenLocalStorage) {
    const authState = JSON.parse(tokenLocalStorage);

    return authState.accessToken || "";
  }
  return "";
};
