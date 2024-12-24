"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/api/instance";

import { loginSchema, LoginFormInputs } from "@/utils/loginSchema";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/button";
import InputField from "@/components/login/InputField";
import { useUserStore } from "@/providers/userStoreProvider";
import { PostAuthLoginResponse } from "@/types/auth";
import { setCookie } from "@/lib/cookie";
import Link from "next/link";
import useOverlay from "@/hooks/useoverlay";
import PopUp from "@/components/popUp";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const login = useUserStore((store) => store.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const overlay = useOverlay();

  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  const onSubmit = async (data: LoginFormInputs) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await instance.post<PostAuthLoginResponse>(
        "/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        const {
          // eslint-disable-next-line camelcase
          access_token,
          user: { email, id, nickName, profileImageUrl },
        } = response.data;
        login(email, id, nickName, profileImageUrl);
        await setCookie("token", access_token);
        if (receiverId && receiverNickName)
          router.push(
            `/letterType?receiverId=${receiverId}&receiverNickName=${receiverNickName}`,
          );
        else router.push("/home");
      } else setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
    } catch (error) {
      if (error instanceof Error)
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
      else {
        console.error("알 수 없는 오류 발생");
        setErrorMessage(
          "로그인 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKakaoLogin = () => {
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI_KAKAO;

    const kakaoAuthUrl = new URL("https://kauth.kakao.com/oauth/authorize");
    kakaoAuthUrl.searchParams.append(
      "client_id",
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
    );
    kakaoAuthUrl.searchParams.append("redirect_uri", redirectUri!);
    kakaoAuthUrl.searchParams.append("response_type", "code");

    window.location.href = kakaoAuthUrl.toString();
  };

  const handleGoogleLogin = () => {
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/auth");
    googleAuthUrl.searchParams.append(
      "client_id",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    );
    googleAuthUrl.searchParams.append("redirect_uri", redirectUri!);
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", "email profile openid");

    window.location.href = googleAuthUrl.toString();
  };

  const handleOverlay = useCallback(() => {
    overlay.mount(
      <PopUp
        button="확인"
        description="준비중입니다."
        onCancel={() => {}}
        onConfirm={() => {}}
        title="알림"
        unmount={overlay.unmount}
      />,
    );
  }, [overlay]);

  return (
    <div className="flex min-h-screen flex-col bg-loginLanding bg-cover bg-center px-5">
      <header className="relative flex items-center justify-center pt-12">
        <button className="absolute left-0" onClick={() => router.back()}>
          <Image
            src="/signUp/backArrow.svg"
            alt="뒤로가기"
            width={32}
            height={32}
          />
        </button>
      </header>
      <HighlightedText />
      <div className="flex flex-grow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-center gap-10 text-center"
        >
          <div className="flex flex-col gap-8">
            <InputField
              type="email"
              placeholder="example1234@naver.com"
              register={register("email")}
              error={errors.email}
              label="이메일"
            />
            <InputField
              type="password"
              placeholder=""
              register={register("password")}
              error={errors.password}
              label="비밀번호"
            />

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <div className="flex flex-col gap-4">
              <Button buttonType="Primary">로그인</Button>
              <div className="space-x-4 text-Body02-R text-line-800">
                <button
                  type="button"
                  className="hover:text-primary-200"
                  onClick={handleOverlay}
                >
                  아이디 찾기
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={handleOverlay}
                  className="hover:text-primary-200"
                >
                  비밀번호 찾기
                </button>
                <span>|</span>
                <Link
                  href={`/signUp?${searchParams.toString()}`}
                  className="hover:text-primary-200"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex w-full flex-col gap-5 px-6 pb-[56px]">
        <div className="mx-auto w-full max-w-md justify-center text-center text-Body02-R text-line-800">
          간편하게 시작하기
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button onClick={handleKakaoLogin}>
            <Image src="/login/kakao.png" width={50} height={50} alt="카카오" />
          </button>
          <button onClick={handleGoogleLogin}>
            <Image src="/login/google.png" width={50} height={50} alt="구글" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
