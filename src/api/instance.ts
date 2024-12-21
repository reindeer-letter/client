import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_MOCK_MODE === "true"
      ? "http://localhost:8080"
      : process.env.NEXT_PUBLIC_API_URL,
});

export default instance;
