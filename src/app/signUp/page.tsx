"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignUpFormData, signUpSchema } from "@/utils/signUpSchema";
import Header from "@/components/header";
import Button from "@/components/button";
import { isAxiosError } from "axios";
import instance from "@/api/instance";
import Modal from "@/components/modal";

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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailValue = watch("email");
  const nicknameValue = watch("nickname");

  const checkEmail = async () => {
    try {
      const response = await instance.get(`/auth/check-email`, {
        params: {
          email: emailValue,
        },
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

  const checkNickname = async () => {
    try {
      const response = await instance.get(`/auth/check-nickname`, {
        params: {
          nickname: nicknameValue,
        },
      });
      if (response.status === 200) {
        alert("사용 가능한 별명입니다.");

        clearErrors("nickname");
      }
    } catch (error) {
      if (isAxiosError(error))
        setError("nickname", { message: "이미 사용 중인 별명입니다." });
    }
  };
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    if (isSubmit) return;
    setIsSubmit(true);

    try {
      const response = await instance.post(`/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("회원가입이 성공적으로 완료되었습니다!");
        router.push("/login");
      } else alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } catch (error) {
      if (isAxiosError(error))
        alert(
          error.response?.data?.message ||
            "오류가 발생했습니다. 다시 시도해주세요.",
        );
      else alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmit(false);
    }
  };

  const handleProfileClick = () => {
    setIsModalOpen(true); // 프로필 클릭 시 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 닫기 버튼 클릭 시 모달 닫기
  };
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* 헤더 */}
      <div className="px-4">
        <Header />
      </div>

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
                  className="h-10 flex-1 rounded bg-grey-800 p-2 text-white focus:outline-none"
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
                  className="h-10 w-full rounded bg-grey-800 p-2 pr-10 text-white focus:outline-none"
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
              <div className="flex w-full gap-2">
                <input
                  id="nickname"
                  type="text"
                  {...register("nickname")}
                  className="h-10 flex-1 rounded bg-grey-800 p-2 text-white focus:outline-none"
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
                <button
                  className="size-16 rounded-full"
                  onClick={handleProfileClick}
                  type="button"
                >
                  <Image
                    src="/signUp/profile1.png"
                    alt="Profile 1"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </button>
                {/* 프로필 이미지 2 */}
                <button
                  className="size-16 rounded-full"
                  onClick={handleProfileClick}
                  type="button"
                >
                  <Image
                    src="/signUp/profile2.png"
                    alt="Profile 2"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </button>
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
      {/* 모달 */}
      {isModalOpen && (
        <Modal closeOnFocusOut unmount={handleModalClose}>
          <div className="flex h-full flex-col justify-between">
            <Modal.HeaderWithClose />
            <div className="flex flex-1 flex-col items-center justify-center">
              <Modal.Title>준비중인 서비스입니다.</Modal.Title>
            </div>
            <div className="mt-4">
              <Modal.Button
                onClick={handleModalClose}
                buttonType="abled"
                className="w-full text-black"
              >
                닫기
              </Modal.Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
