"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, signUpSchema } from "@/utils/signUpSchema";
import Button from "@/components/button";
import { isAxiosError } from "axios";
import instance from "@/api/instance";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const emailValue = watch("email");

  const checkEmail = async () => {
    try {
      const response = await instance.get(`/auth/check-email`, {
        params: { email: emailValue },
      });
      if (response.status === 200) {
        alert("사용 가능한 이메일입니다.");
        clearErrors("email");
      }
    } catch (error) {
      if (isAxiosError(error))
        setError("email", { message: "이미 사용 중인 이메일입니다." });
    }
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data);
    alert("회원가입 완료!");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-5">
      {/* 상단 헤더 */}
      <header className="relative flex items-center justify-center pt-12">
        <button className="absolute left-0" onClick={() => router.push("/")}>
          <Image
            src="/signUp/backArrow.svg"
            alt="뒤로가기"
            width={32}
            height={32}
          />
        </button>
        <h1 className="text-center text-Title01-SB text-line-700">회원가입</h1>
        <button className="absolute right-0" onClick={() => router.push("/")}>
          <Image src="/signUp/close.svg" alt="닫기" width={32} height={32} />
        </button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-1 flex-col items-center justify-between"
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-[32px]">
          {/* 이메일 */}
          <div className="flex w-full flex-col gap-[8px]">
            <label
              htmlFor="email"
              className="block text-Body02-SB text-line-600"
            >
              이메일
            </label>
            <div className="flex h-[40px] w-full items-center gap-2">
              <input
                id="email"
                type="text"
                {...register("email")}
                placeholder="example1234@naver.com"
                className="h-full flex-1 border-b border-line-200 text-Body01-M text-line-200 placeholder:text-line-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={checkEmail}
                className="h-full flex-shrink-0 rounded-[62px] bg-line-50 px-4 text-Body01-M tracking-[-0.011em] text-line-800"
              >
                중복확인
              </button>
            </div>
            <p className="mt-1 h-3 text-sm text-red-500">
              {errors.email?.message}
            </p>
          </div>

          {/* 비밀번호 */}
          <div className="flex w-full flex-col gap-[8px]">
            <label
              htmlFor="password"
              className="block text-Body02-SB text-line-600"
            >
              비밀번호
            </label>
            <div className="relative h-[40px] w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="비밀번호를 입력하세요."
                className="h-full w-full border-b border-line-200 text-Body01-M text-line-200 placeholder:text-line-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Image
                  src={
                    showPassword
                      ? "/signUp/closeEyeIcon.svg"
                      : "/signUp/eyeIcon.svg"
                  }
                  alt="비밀번호 표시"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <p className="mt-1 h-3 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex w-full flex-col items-center pb-[56px] pt-[16px]">
          <Button
            type="submit"
            buttonType="abled"
            className="w-full rounded-[60px] border-none bg-grey-200 text-grey-400"
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
