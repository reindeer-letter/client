"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/api/instance";

import { loginSchema, LoginFormInputs } from "@/utils/loginSchema";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/button";
import InputField from "@/components/login/InputField";

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

  const [, setId] = useLocalStorage("userId");
  const [, setNickName] = useLocalStorage("nickName");
  const [, setToken] = useLocalStorage("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  const onSubmit = async (data: LoginFormInputs) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await instance.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const result = response.data;
        setId(result.user.id);
        setNickName(result.user.nickName);
        setToken(result.access_token);

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
  // const handleSimpleStartClick = () => {
  //   overlay.mount(
  //     <PopUp
  //       button="확인"
  //       title="준비 중 입니다."
  //       description="현재 기능은 준비 중입니다."
  //       onConfirm={() => overlay.unmount()}
  //       onCancel={() => overlay.unmount()}
  //       unmount={overlay.unmount}
  //     />,
  //   );
  // };

  const handleKakaoLogin = () => {
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://www.reindeer-letter.site/auth/google/callback"
        : "http://localhost:3000/auth/google/callback";

    window.location.href = `https://kauth.kakao.com/oauth/authorize?=client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const handleGoogleLogin = () => {
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://www.reindeer-letter.site/auth/google/callback"
        : "http://localhost:3000/auth/google/callback";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile openid`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div
      className="flex h-screen flex-col bg-cover bg-center px-5"
      style={{ backgroundImage: "url('/background/login.png')" }}
    >
      <HighlightedText />
      <div className="mt-14 flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-7 text-center"
        >
          <div className="flex flex-col space-y-10">
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
            <Button buttonType="Primary">로그인</Button>
          </div>

          <div className="mt-4 space-x-4 text-Body02-R text-line-800">
            <a href="#" className="hover:text-primary-200">
              아이디 찾기
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary-200">
              비밀번호 찾기
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-primary-200"
              onClick={() => router.push("/signUp")}
            >
              회원가입
            </a>
          </div>
        </form>
      </div>

      <div className="w-full px-6 pb-[63px]">
        <div className="mx-auto w-full max-w-md justify-center pb-[20px] text-center text-Body02-R text-line-800">
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
