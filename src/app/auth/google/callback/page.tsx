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

        // 백엔드로 code 전달
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}auth/google/callback?code=${code}`,
        );

        const { accessToken, user } = response.data;

        // Access Token 저장
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // 메인 페이지로 이동
        router.push("/home");
      } catch (error) {
        console.error("Google Login Callback Error:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return <div>Google 로그인 처리 중...</div>;
}
