/* eslint-disable camelcase */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) throw new Error("Authorization code not found");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}auth/google/callback?code=${code}`,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
            },
          },
        );

        console.log("Response:", response.data);

        const { isNewUser, userData, access_token, user } = response.data;

        if (isNewUser) {
          localStorage.setItem("googleUserData", JSON.stringify(userData));
          router.push("/profile");
          return;
        }

        // 기존 사용자인 경우
        localStorage.setItem("token", access_token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("nickName", user.nickName);

        router.push("/home");
      } catch (error) {
        console.error("Error details:", error);
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Status:", error.response?.status);
        }
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return <div>Google 로그인 처리 중...</div>;
}
