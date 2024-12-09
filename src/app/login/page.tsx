"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/api/instance";
import useOverlay from "@/hooks/useoverlay";
import PopUp from "@/components/popUp";
import { loginSchema, LoginFormInputs } from "../../utils/loginSchema";
import InputField from "./components/InputField";

const LoginPage = () => {
  const router = useRouter();
  const overlay = useOverlay();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [, setId] = useLocalStorage("userId");
  const [, setToken] = useLocalStorage("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setToken(result.access_token);
        router.push("/home");
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
    }
  };
  const handleSimpleStartClick = () => {
    overlay.mount(
      <PopUp
        button="확인"
        title="준비 중 입니다."
        description="현재 기능은 준비 중입니다."
        onConfirm={() => overlay.unmount()}
        onCancel={() => overlay.unmount()}
        unmount={overlay.unmount}
      />,
    );
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center -bg--background px-4 text-white">
      <div className="absolute left-4 top-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-Body02-R text-grey-300 hover:text-white"
        >
          <Image src="/left_arrow.png" width={24} height={24} alt="뒤로가기" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-12 w-full max-w-md space-y-7"
      >
        <div className="flex flex-col items-center space-y-2 pb-4 pt-24 text-center">
          <p className="text-Body01-M">미래의 나에게</p>
          <p className="pb-2 text-Body01-M">오늘의 기억을 선물하는 편지,</p>
          <div className="flex w-full justify-center">
            <Image src="/logo.png" width={120} height={37} alt="로고" />
          </div>
        </div>

        <div className="w-full space-y-4">
          <InputField
            type="email"
            placeholder="이메일 입력"
            register={register("email")}
            error={errors.email}
          />
          <InputField
            type="password"
            placeholder="비밀번호 입력"
            register={register("password")}
            error={errors.password}
          />
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-white font-semibold text-grey-900 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </div>

        <div className="mt-4 space-x-4 text-center text-Body02-R text-grey-300">
          <a href="#" className="hover:text-white">
            아이디 찾기
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            비밀번호 찾기
          </a>
          <span>|</span>
          <a
            href="#"
            className="hover:text-white"
            onClick={() => router.push("/signUp")}
          >
            회원가입
          </a>
        </div>
      </form>

      <div className="w-full px-6 pt-12">
        <div className="mx-auto mb-6 flex w-full max-w-md items-center">
          <div className="flex-1 border-t border-grey-700" />
          <p className="mx-2 flex-1 whitespace-nowrap text-sm text-grey-300">
            간편하게 시작하기
          </p>
          <div className="flex-1 border-t border-grey-700" />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button onClick={handleSimpleStartClick}>
            <Image src="/login/kakao.png" width={50} height={50} alt="카카오" />
          </button>
          <button onClick={handleSimpleStartClick}>
            <Image src="/login/naver.png" width={50} height={50} alt="네이버" />
          </button>
          <button onClick={handleSimpleStartClick}>
            <Image
              src="/login/facebook.png"
              width={50}
              height={50}
              alt="페이스북"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
