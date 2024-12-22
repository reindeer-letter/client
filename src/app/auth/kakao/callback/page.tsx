/* eslint-disable camelcase */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import instance from "@/api/instance";

export default function KakaoCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) throw new Error("Authorization code not found");

        const response = await instance.get(`auth/kakao/callback?code=${code}`);

        console.log("Response:", response.data);

        // 새로운 사용자인 경우
        if (response.data.isNewUser) {
          localStorage.setItem(
            "kakaoUserData",
            JSON.stringify(response.data.userData),
          );
          router.push("/profile");
          return;
        }

        // 기존 사용자인 경우
        const { access_token, user } = response.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("nickName", user.nickName);

        router.push("/home");
      } catch (error) {
        if (axios.isAxiosError(error))
          console.error("Error details:", {
            response: error.response?.data,
            status: error.response?.status,
          });
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        router.push("/login");
      }
    };

    handleKakaoCallback();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-firstLanding bg-cover bg-center">
      <div className="text-line-900">Kakao 로그인 처리 중...</div>
    </div>
  );
}
