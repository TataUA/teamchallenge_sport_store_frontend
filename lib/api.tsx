import axios from "axios";
import { getToken } from "@/lib/utils/token";

export const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    "Content-Type": "application-json",
  },
});

const instanceWithoutToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);
