"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignUpFormData, signUpSchema } from "@/utils/signUpSchema";
import Header from "@/components/header";
import Button from "@/components/button";
import axios from "axios";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const checkPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailValue = watch("email");
  const nicknameValue = watch("nickname");

  const checkEmail = async () => {
    try {
      const response = await axios.get(`${API_URL}auth/check-email`, {
        params: {
          email: emailValue,
        },
      });
      if (response.status === 200) {
        alert("사용 가능한 이메일입니다.");
        clearErrors("email");
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        setError("email", { message: "이미 사용 중인 이메일입니다." });
    }
  };

  const checkNickname = async () => {
    try {
      const response = await axios.get(`${API_URL}auth/check-nickname`, {
        params: {
          nickname: nicknameValue,
        },
      });
      if (response.status === 200) {
        alert("사용 가능한 별명입니다.");

        clearErrors("nickname");
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        setError("nickname", { message: "이미 사용 중인 별명입니다." });
    }
  };
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    if (isSubmit) return;
    setIsSubmit(true);

    try {
      const response = await axios.post(`${API_URL}auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("회원가입이 성공적으로 완료되었습니다!");
        router.push("/login");
      } else alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } catch (error) {
      if (axios.isAxiosError(error))
        alert(
          error.response?.data?.message ||
            "오류가 발생했습니다. 다시 시도해주세요.",
        );
      else alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* 헤더 */}
      <Header />

      {/* 페이지 컨텐츠 */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* 페이지 타이틀 */}
        <header className="relative mb-8 flex items-center justify-center">
          <button className="absolute left-0" onClick={() => router.push("/")}>
            <Image
              src="/signUp/backArrow.svg"
              alt="뒤로가기"
              width={28}
              height={24}
            />
          </button>
          <h1 className="text-center text-Title01-SB">회원가입</h1>
        </header>

        {/* 폼 영역 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col justify-between"
        >
          <div className="flex-1 space-y-8 overflow-auto">
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="mb-2 block text-Body02-R">
                이메일을 입력하세요
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  className="flex-1 rounded bg-grey-800 p-2 text-white"
                />
                <button
                  className="rounded-md border border-grey-700 px-3 py-2"
                  type="button"
                  onClick={checkEmail}
                >
                  중복확인
                </button>
              </div>
              <p className="h-5 py-1 text-red-500">{errors.email?.message}</p>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="mb-2 block text-Body02-R">
                비밀번호를 입력하세요
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full rounded bg-grey-800 p-2 pr-10 text-white"
                />
                <button
                  type="button"
                  onClick={checkPassword}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <Image
                    src={
                      showPassword
                        ? "/signUp/closeEyeIcon.svg"
                        : "/signUp/eyeIcon.svg"
                    }
                    alt="check password"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <p className="h-5 py-1 text-red-500">
                {errors.password?.message}
              </p>
            </div>

            {/* 별명 */}
            <div>
              <label htmlFor="nickname" className="mb-2 block text-Body02-R">
                별명을 입력하세요
              </label>
              <div className="flex gap-2">
                <input
                  id="nickname"
                  type="text"
                  {...register("nickname")}
                  className="flex-1 rounded bg-grey-800 p-2 text-white"
                />
                <button
                  className="rounded-md border border-grey-700 px-3 py-2"
                  type="button"
                  onClick={checkNickname}
                >
                  중복확인
                </button>
              </div>
              <p className="h-5 py-1 text-red-500">
                {errors.nickname?.message}
              </p>
            </div>

            {/* 프로필 이미지 */}
            <div>
              <label htmlFor="profileImg" className="mb-2 block text-Body01-R">
                사용할 프로필 이미지를 선택하세요
              </label>
              <div className="flex gap-4">
                {/* 프로필 이미지 1 */}
                <div className="size-16 rounded-full">
                  <Image
                    src="/signUp/profile1.png"
                    alt="Profile 1"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                {/* 프로필 이미지 2 */}
                <div className="size-16 rounded-full">
                  <Image
                    src="/signUp/profile2.png"
                    alt="Profile 2"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 완료 버튼 */}
          <div className="flex justify-center bg-black pb-8">
            <Button type="submit" buttonType="abled" className="text-black">
              완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
