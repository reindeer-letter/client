import { getCookie, removeCookie } from "@/lib/cookie";
import axios from "axios";
import redirectAction from "@/lib/redirectAction";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) return config;

  const token = await getCookie("token");
  const newConfig = { ...config };
  if (token) newConfig.headers.Authorization = `Bearer ${token}`;
  return newConfig;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error))
      if (error.response?.status === 401) {
        await removeCookie("token");
        await redirectAction("/login");
      }
    return Promise.reject(error);
  },
);

export default instance;
