"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/api/instance";
import { isAxiosError } from "axios";
import Button from "@/components/button";
import ProfileCustomization from "@/components/profile/ProfileCustomization";
import { ProfileFormData, profileSchema } from "@/utils/signUpSchema";

export default function ProfilePage() {
  const [userData, setUserData] = useState<{
    email: string;
    password?: string; // 일반 회원가입 사용자를 위한 비밀번호
    googleId?: string; // 소셜 로그인 사용자
  } | null>(null);

  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [selectedHorn, setSelectedHorn] = useState<string>("OPTION-01");
  const [selectedScarf, setSelectedScarf] = useState<string>("RED");
  const [selectedSkin, setSelectedSkin] = useState<string>("BROWN");
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);

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
    // 일반 회원가입 데이터 또는 소셜 로그인 데이터를 확인
    const googleData = localStorage.getItem("googleUserData");
    const signUpData = localStorage.getItem("signUpData");

    if (googleData)
      setUserData(JSON.parse(googleData)); // 소셜 로그인 사용자 데이터
    else if (signUpData)
      setUserData(JSON.parse(signUpData)); // 일반 회원가입 사용자 데이터
    else {
      alert("데이터가 없습니다. 다시 로그인해주세요.");
      router.push("/login");
    }

    fetchProfilePreview("OPTION-01", "RED", "BROWN");
  }, [router]);

  const fetchProfilePreview = async (
    hornType: string,
    scarfColor: string,
    skinColor: string,
  ) => {
    try {
      const response = await instance.get("/auth/reindeer-preview", {
        params: {
          skinColor,
          antlerType: hornType,
          mufflerColor: scarfColor,
        },
      });
      setProfileImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("미리보기 이미지 로드 실패:", error);
    }
  };

  const handleOptionClick = (
    hornType: string,
    scarfColor: string,
    skinColor: string,
  ) => {
    if (hornType) setSelectedHorn(hornType);
    if (scarfColor) setSelectedScarf(scarfColor);
    if (skinColor) setSelectedSkin(skinColor);

    fetchProfilePreview(
      hornType || selectedHorn,
      scarfColor || selectedScarf,
      skinColor || selectedSkin,
    );
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
        setIsNicknameChecked(true);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        setError("nickname", { message: "이미 사용 중인 별명입니다." });
        setIsNicknameChecked(false);
      } else alert("중복 확인 중 문제가 발생했습니다.");
    }
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!userData || !isNicknameChecked) {
      setError("nickname", { message: "별명 중복 확인을 완료해주세요." });
      return;
    }

    try {
      // 소셜 로그인 사용자와 일반 회원가입 사용자 구분
      if (userData.googleId)
        // 소셜 로그인 사용자 회원가입
        await instance.post("/auth/google/register", {
          googleId: userData.googleId,
          email: userData.email,
          additionalData: {
            nickname: data.nickname,
            skinColor: selectedSkin,
            antlerType: selectedHorn,
            mufflerColor: selectedScarf,
          },
        });
      else
        // 일반 회원가입 사용자 회원가입
        await instance.post("/auth/register", {
          email: userData.email,
          password: userData.password,
          nickname: data.nickname,
          profileImageUrl,
          skinColor: selectedSkin,
          antlerType: selectedHorn,
          mufflerColor: selectedScarf,
        });

      alert("회원가입이 완료되었습니다!");
      localStorage.removeItem("googleUserData");
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
            src={profileImageUrl || "/profile/image.png"}
            alt="프로필 이미지"
            width={240}
            height={240}
            className="rounded-full bg-line-200"
          />
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

          <ProfileCustomization
            selectedHorn={selectedHorn}
            selectedScarf={selectedScarf}
            selectedSkin={selectedSkin}
            handleOptionClick={handleOptionClick}
          />
        </div>

        {/* 완료 버튼 */}
        <div className="flex w-full flex-col items-center pb-[56px] pt-[16px]">
          <Button
            type="submit"
            buttonType={nicknameValue?.trim() ? "abled" : undefined}
            disabled={!nicknameValue?.trim()}
            className={`w-full rounded-[60px] border-none ${
              nicknameValue?.trim()
                ? "bg-primary-200 text-white"
                : "bg-grey-200 text-grey-400"
            }`}
          >
            완료
          </Button>
        </div>
      </form>
    </div>
  );
}
