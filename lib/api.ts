// import axios from "axios";
// // import { getToken } from "@/lib/utils/token";

// // export const instance = axios.create({
// //   baseURL: process.env.BASE_API_URL,
// //   headers: {
// //     "Content-Type": "application-json",
// //   },
// // });

// // const instanceWithoutToken = axios.create({
// //   baseURL: process.env.REACT_APP_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // instance.interceptors.request.use(
// //   (config: any) => {
// //     const token = getToken();
// //     if (token) {
// //       config.headers["Authorization"] = `Bearer ${token}`;
// //       return config;
// //     }
// //   },
// //   (error) => Promise.reject(error)
// // );

// const $instance = axios.create({
//   baseURL: "https://connections-api.herokuapp.com",
// });

// //Token
// export const setToken = (token: string) => {
//   $instance.defaults.headers["Authorization"] = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   $instance.defaults.headers["Authorization"] = "";
// };

// //User
// export const registerUser = async (name, email, password) => {
//   const { data } = await $instance.post("/users/signup", {
//     name,
//     email,
//     password,
//   });
//   return data;
// };

// export const loginUser = async (email, password) => {
//   const { data } = await $instance.post("/users/login", { email, password });
//   return data;
// };

// export const currentUser = async () => {
//   const { data } = await $instance.get("/users/current");
//   return data;
// };

// export const logoutUser = async () => {
//   const { data } = await $instance.post("/users/logout");
//   return data;
// };
