import { getCookie, removeCookie } from "@/lib/cookie";
import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_MOCK_MODE === "true"
      ? "http://localhost:8080"
      : process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) return config;

  const token = await getCookie("token");
  const newConfig = { ...config };
  if (!token) return newConfig;
  newConfig.headers.Authorization = `Bearer ${token}`;
  return newConfig;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) await removeCookie("token");
    return Promise.reject(error);
  },
);

export default instance;
