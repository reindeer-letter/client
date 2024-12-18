"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/api/instance";
import Button from "@/components/button";
import EmailVerificationForm from "@/components/signUp/VerifyEmail";
import { SignUpFormData, signUpSchema } from "@/utils/signUpSchema";
import { isAxiosError } from "axios";

export default function SignUpPage() {
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSignUp: SubmitHandler<SignUpFormData> = async (data) => {
    console.log("onSignUp called with data:", data);
    if (!verifiedEmail) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    try {
      await instance.post("/auth/register", {
        email: verifiedEmail,
        password: data.password,
      });
      alert("회원가입이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("회원가입 실패:", error); // 디버깅용
      if (isAxiosError(error) && error.response)
        alert(
          `회원가입 실패: ${error.response.data.message || "오류가 발생했습니다."}`,
        );
      else alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-5">
      <header className="relative flex items-center justify-center pt-12">
        <button
          className="absolute left-0"
          onClick={() =>
            verifiedEmail ? setVerifiedEmail(null) : router.push("/")
          }
        >
          <Image
            src="/signUp/backArrow.svg"
            alt="뒤로가기"
            width={32}
            height={32}
          />
        </button>
        <h1 className="text-center text-Title01-SB text-line-700">
          {verifiedEmail ? "회원가입" : "이메일 인증"}
        </h1>
        <button className="absolute right-0" onClick={() => router.push("/")}>
          <Image src="/signUp/close.svg" alt="닫기" width={32} height={32} />
        </button>
      </header>

      {!verifiedEmail ? (
        <EmailVerificationForm onSuccess={setVerifiedEmail} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 기본 동작 방지
            handleSubmit(onSignUp)(e); // 핸들러 호출
          }}
          className="flex w-full flex-1 flex-col items-center justify-between"
        >
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-[32px]">
            <div className="flex w-full flex-col gap-[8px]">
              <label
                htmlFor="email"
                className="block text-Body02-SB text-line-600"
              >
                이메일
              </label>
              <input
                id="email"
                type="text"
                value={verifiedEmail || ""}
                readOnly
                className="h-[40px] w-full cursor-not-allowed border-b border-line-200 text-Body01-M text-line-900 placeholder:text-line-200 focus:outline-none"
              />
            </div>

            <div className="group flex w-full flex-col gap-[8px]">
              <label
                htmlFor="password"
                className="block text-Body02-SB text-line-600 group-focus-within:text-line-900"
              >
                비밀번호
              </label>
              <div className="relative h-[40px] w-full">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="비밀번호를 입력하세요."
                  className="h-[40px] w-full border-b border-line-200 text-Body01-M text-line-900 placeholder:text-line-200 focus:border-line-900 focus:outline-none"
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
      )}
    </div>
  );
}
