// export function setToken(token: string) {
//   const time = new Date().getTime();
//   localStorage.setItem("token", token);
//   localStorage.setItem("tokenTime", time.toString());
// }

// export function getToken(): string | null {
//   const token = localStorage.getItem("token");
//   const createdAt = localStorage.getItem("tokenTime") as string;
//   const currentTime = new Date().getTime();
//   if (currentTime - Number(createdAt) < Number(process.env.TOKEN_LIVE_TIME)) {
//     return token;
//   } else {
//     removeToken();
//     return null;
//   }
// }

// export function removeToken() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("tokenTime");
// }
