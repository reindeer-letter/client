import { getCookie } from "@/lib/cookie";
import redirectAction from "@/lib/redirectAction";
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
    if (error.response.status === 401) await redirectAction("/login");
    return Promise.reject(error);
  },
);

export default instance;
