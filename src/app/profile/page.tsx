"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/api/instance";
import { isAxiosError } from "axios";
import Button from "@/components/button";
import { ProfileFormData, profileSchema } from "@/utils/signUpSchema";

export default function ProfilePage() {
  const [signUpData, setSignUpData] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const nicknameValue = watch("nickname");

  useEffect(() => {
    const data = localStorage.getItem("signUpData");
    if (data) setSignUpData(JSON.parse(data));
    else {
      alert("데이터가 없습니다. 처음부터 다시 진행해주세요.");
      router.push("/signUp");
    }
  }, [router]);

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

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!signUpData) return;

    try {
      await instance.post("/auth/register", {
        email: signUpData.email,
        password: signUpData.password,
        nickname: data.nickname,
      });
      alert("회원가입이 완료되었습니다!");
      localStorage.removeItem("signUpData");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-5">
      {/* 상단 헤더 */}
      <header className="relative flex items-center justify-center pt-12">
        <button
          className="absolute left-0"
          onClick={() => router.push("/signUp")}
        >
          <Image
            src="/signUp/backArrow.svg"
            alt="뒤로가기"
            width={32}
            height={32}
          />
        </button>
        <h1 className="text-center text-Title01-SB text-line-700">
          내 프로필 설정
        </h1>
        <button className="absolute right-0" onClick={() => router.push("/")}>
          <Image src="/signUp/close.svg" alt="닫기" width={32} height={32} />
        </button>
      </header>

      {/* 프로필 꾸미기 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex grow flex-col items-center justify-between pt-[20px]"
      >
        <div className="flex h-full w-full flex-col items-center gap-[16px]">
          <Image
            src="/profile/image.png"
            alt="프로필 이미지"
            width={240}
            height={240}
          />
          {/* 별명 입력 */}
          <div className="flex w-full items-center pt-5">
            <div className="group flex w-full flex-col gap-[8px]">
              <label
                htmlFor="email"
                className="block text-Body02-SB text-line-600 group-focus-within:text-line-900"
              >
                내 별명
              </label>
              <div className="flex h-[40px] w-full items-center gap-2">
                <input
                  id="nickname"
                  type="text"
                  {...register("nickname")}
                  placeholder="별명을 입력하세요."
                  className="h-full flex-1 border-b border-line-200 text-Body01-M text-line-900 placeholder:text-line-200 focus:border-line-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={checkNickname}
                  className="h-full flex-shrink-0 rounded-[62px] bg-line-50 px-4 text-Body01-M text-line-800"
                >
                  중복확인
                </button>
              </div>
              <p className="mt-1 h-3 text-sm text-red-500">
                {errors.nickname?.message}
              </p>
            </div>
          </div>
          {/* 뿔, 목도리, 피부 선택 */}
          <div className="flex w-full flex-col gap-[24px]">
            {/* 뿔 선택 */}
            <div className="flex items-center gap-[24px]">
              <p className="w-[42px] text-Body02-R text-line-900">뿔</p>
              <div className="flex">
                {["horn1", "horn2", "horn3"].map((horn) => (
                  <button
                    key={horn}
                    type="button"
                    className="flex h-[44px] w-[76px] items-center justify-center rounded-[12px]"
                  >
                    <Image
                      src={`/profile/horn/${horn}.png`}
                      alt={`뿔 ${horn}`}
                      width={46}
                      height={22}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 목도리 선택 */}
            <div className="flex items-center gap-[24px]">
              <p className="w-[42px] text-Body02-R text-line-900">목도리</p>
              <div className="flex">
                {["red", "green", "pink"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="flex h-[44px] w-[76px] items-center justify-center rounded-[12px]"
                  >
                    <Image
                      src={`/profile/neckwarmer/${color}.png`}
                      alt={`목도리 ${color}`}
                      width={28}
                      height={28}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 피부 선택 */}
            <div className="flex items-center gap-[24px]">
              <p className="w-[42px] text-Body02-R text-line-900">피부</p>
              <div className="flex">
                {["default", "sky"].map((skin) => (
                  <button
                    key={skin}
                    type="button"
                    className="flex h-[44px] w-[76px] items-center justify-center"
                  >
                    <Image
                      src={`/profile/skin/${skin}.png`}
                      alt={`피부 ${skin}`}
                      width={28}
                      height={28}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>{" "}
        </div>

        {/* 완료 버튼 */}
        <div className="flex w-full flex-col items-center pb-[56px] pt-[16px]">
          <Button
            type="submit"
            buttonType="abled"
            className="w-full rounded-[60px] border-none bg-grey-200 text-grey-400"
          >
            완료
          </Button>
        </div>
      </form>
    </div>
  );
}
