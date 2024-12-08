"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, signUpSchema } from "@/utils/signUpSchema";
import Header from "@/components/header";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const checkPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SignUpFormData> = () => {};

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* 헤더 */}
      <Header />

      {/* 페이지 컨텐츠 */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* 페이지 타이틀 */}
        <header className="relative mb-8 flex items-center justify-center">
          <button className="absolute left-0">
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
          <div className="flex-1 space-y-10 overflow-auto">
            {/* 아이디 */}
            <div>
              <label htmlFor="userId" className="mb-2 block text-Body01-R">
                아이디를 입력하세요
              </label>
              <div className="flex gap-2">
                <input
                  id="userId"
                  type="text"
                  {...register("userId")}
                  className="flex-1 rounded bg-grey-800 p-2 text-white"
                />
                <button
                  className="rounded-md border border-grey-700 px-3 py-2"
                  type="button"
                >
                  중복확인
                </button>
              </div>
              <p className="h-5 py-1 text-red-500">{errors.userId?.message}</p>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="mb-2 block text-Body01-R">
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
              <label htmlFor="nickname" className="mb-2 block text-Body01-R">
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
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-white py-4 font-semibold text-black"
            >
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
