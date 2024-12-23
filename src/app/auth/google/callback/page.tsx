/* eslint-disable camelcase */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import instance from "@/api/instance";
import { setCookie } from "@/lib/cookie";
import { useUserStore } from "@/providers/userStoreProvider";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const login = useUserStore((store) => store.login);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) throw new Error("Authorization code not found");

        const response = await instance.get(
          `auth/google/callback?code=${code}`,
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

        login(user.email, user.id, user.nickname, user.profileImageUrl);
        await setCookie("token", access_token);

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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-firstLanding bg-cover bg-center">
      <div className="text-line-900">Google 로그인 처리 중...</div>
    </div>
  );
}
