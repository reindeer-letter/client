"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/api/instance";
import Button from "@/components/button";
import { VerifyEmailFormData, verifyEmailSchema } from "@/utils/signUpSchema";
import { isAxiosError } from "axios";

type EmailVerificationFormProps = {
  onSuccess: (email: string) => void;
};

export default function VerifyEmail({ onSuccess }: EmailVerificationFormProps) {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const codeValue = watch("code");
  const sendVerificationCode = async () => {
    try {
      await instance.post("/auth/send-verification", { email: emailValue });
      alert("인증번호가 발송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      if (isAxiosError(error))
        if (error.response?.status === 409)
          setError("email", { message: error.response.data.message });
        else setError("email", { message: "인증번호 발송에 실패했습니다." });
    }
  };

  const onSubmit: SubmitHandler<VerifyEmailFormData> = async (data) => {
    try {
      await instance.post("/auth/verify-email", {
        email: data.email,
        code: data.code,
      });
      alert("이메일 인증이 완료되었습니다.");
      onSuccess(data.email);
    } catch (error) {
      if (isAxiosError(error))
        setError("code", { message: "인증번호가 올바르지 않습니다." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-1 flex-col items-center justify-between"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-[32px]">
        <div className="group flex w-full flex-col gap-[8px]">
          <label
            htmlFor="email"
            className="block text-Body02-SB text-line-600 group-focus-within:text-line-900"
          >
            이메일
          </label>
          <div className="flex h-[40px] w-full items-center gap-2">
            <input
              id="email"
              type="text"
              {...register("email")}
              placeholder="example1234@naver.com"
              className="h-full flex-1 border-b border-line-200 text-Body01-M text-line-900 placeholder:text-line-200 focus:border-line-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              className="h-full flex-shrink-0 rounded-[62px] bg-line-50 px-4 text-Body01-M text-line-800"
              disabled={!emailValue || isCodeSent}
            >
              인증요청
            </button>
          </div>
          <p className="mt-1 h-3 text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        {isCodeSent && (
          <div className="group flex w-full flex-col gap-[8px]">
            <label
              htmlFor="code"
              className="block text-Body02-SB text-line-600 group-focus-within:text-line-900"
            >
              인증번호
            </label>
            <input
              id="code"
              type="text"
              {...register("code")}
              placeholder="인증번호를 입력하세요."
              className="h-[40px] w-full border-b border-line-200 text-Body01-M text-line-900 placeholder:text-line-200 focus:border-line-900 focus:outline-none"
            />
            <p className="mt-1 h-3 text-sm text-red-500">
              {errors.code?.message}
            </p>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center pb-[56px] pt-[16px]">
        <Button
          type="submit"
          buttonType={emailValue && codeValue ? "abled" : undefined}
          disabled={!emailValue || !codeValue}
          className={`w-full rounded-[60px] border-none ${
            emailValue && codeValue
              ? "bg-primary-200 text-white"
              : "bg-grey-200 text-grey-400"
          }`}
        >
          인증 완료
        </Button>
      </div>
    </form>
  );
}
