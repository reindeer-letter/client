"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("로그인 성공:", result);
      } else {
        console.error("로그인 실패:", response.statusText);
        alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#434343] px-4 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-28 w-full max-w-xs space-y-7"
      >
        <div className="flex flex-col items-center space-y-2 pb-4 pt-8 text-center">
          <p className="text-sm">미래의 나에게</p>
          <p className="pb-2 text-sm">오늘의 기억을 선물하는 편지,</p>
          <div className="flex w-full justify-center">
            <Image src="/logo.png" width={120} height={37} alt="로고" />
          </div>
        </div>

        <div className="w-full space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일 입력"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일 주소를 입력하세요",
                },
              })}
              className={`h-12 w-full rounded-lg border px-4 placeholder-gray-400 focus:border-white focus:bg-grey-800 focus:outline-none ${
                errors.email
                  ? "border-red-500 bg-transparent text-red-500"
                  : "border-gray-400 bg-transparent text-white"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호 입력"
              {...register("password", { required: "비밀번호를 입력해주세요" })}
              className={`h-12 w-full rounded-lg border px-4 placeholder-gray-400 focus:border-white focus:bg-grey-800 focus:outline-none ${
                errors.password
                  ? "border-red-500 bg-transparent text-red-500"
                  : "border-gray-400 bg-transparent text-white"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-white font-semibold text-black hover:bg-gray-100 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </div>

        <div className="mt-4 space-x-4 text-center text-sm text-grey-300">
          <a href="#" className="hover:text-white">
            아이디 찾기
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            비밀번호 찾기
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            회원가입
          </a>
        </div>
      </form>

      <div className="absolute bottom-10 w-full px-6">
        <div className="mx-auto mb-5 flex w-full max-w-[600px] items-center sm:max-w-sm">
          <div className="flex-1 border-t border-grey-300" />
          <p className="mx-4 whitespace-nowrap text-sm text-grey-300">
            간편하게 시작하기
          </p>
          <div className="flex-1 border-t border-grey-300" />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Image src="/login/kakao.png" width={50} height={50} alt="카카오" />
          <Image src="/login/naver.png" width={50} height={50} alt="카카오" />
          <Image
            src="/login/facebook.png"
            width={50}
            height={50}
            alt="카카오"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
