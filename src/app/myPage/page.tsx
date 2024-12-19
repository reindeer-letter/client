"use client";

import instance from "@/api/instance";
import useGetFetch from "@/hooks/useGetFetch";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GetAuthProfileResponse } from "@/types/profile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Page() {
  const { data, isLoading, isError, isCancelled, error } =
    useGetFetch<GetAuthProfileResponse>({
      route: "/auth/profile",
    });
  const [, setUserId] = useLocalStorage("userId");
  const [, setNickName] = useLocalStorage("nickName");
  const [token, setToken] = useLocalStorage("token");
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await instance.post("/auth/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(null);
      setNickName(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
      throw error;
    }
  }, [setUserId, setNickName, setToken, router, token]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <header className="relative w-full pb-4 pt-[52px] text-center">
        <span className="block pb-4 text-Title01-SB text-line-700">
          마이페이지
        </span>
        <button
          type="button"
          onClick={handleBack}
          className="absolute right-4 top-[52px]"
        >
          <Image
            priority
            src="/icons/close.png"
            alt="close"
            width={32}
            height={32}
          />
        </button>
        <section className="mt-5 flex flex-col items-center justify-center gap-4">
          {isLoading && (
            <div className="h-[240px] w-[240px] animate-pulse rounded-full bg-[#d9d9d9]" />
          )}
          {isError && !isCancelled && (
            <div className="text-red-500">
              에러가 발생했습니다: {error?.message}
            </div>
          )}
          {data && (
            <Image
              priority
              src={data.profileImageUrl}
              alt="profile"
              width={240}
              height={240}
              className="rounded-full bg-[#d9d9d9]"
            />
          )}
          {isLoading && <div className="h-5 w-36 animate-pulse bg-[#d9d9d9]" />}
          {data && (
            <div className="pb-9 text-Title01-R text-grey-800">
              {data.nickName}
            </div>
          )}
        </section>
      </header>
      <section className="flex flex-1 flex-col gap-3 pb-20">
        <Link
          href="/myPage/uncompletedLetter"
          className="mx-5 block rounded-2xl border-[1.5px] border-line-100 px-4 py-5 text-left text-Title01-M text-line-900 hover:bg-line-100"
        >
          <Image
            priority
            src="/icons/uncompleted-letter.png"
            alt="letter-to-me"
            width={36}
            height={36}
            className="inline-block"
          />
          작성 중인 편지
        </Link>
        <Link
          href="/myPage/letterToMe"
          className="mx-5 block rounded-2xl border-[1.5px] border-line-100 px-4 py-5 text-left text-Title01-M text-line-900 hover:bg-line-100"
        >
          <Image
            priority
            src="/icons/letter-to-me.png"
            alt="letter-to-me"
            width={36}
            height={36}
            className="inline-block"
          />
          내게 쓴 편지
        </Link>
      </section>
      <section className="mb-14 flex justify-center gap-8">
        <button
          type="button"
          className="text-grey-400 underline hover:text-grey-600"
          onClick={handleLogout}
        >
          회원탈퇴
        </button>
        <button
          type="button"
          className="text-grey-400 underline hover:text-grey-600"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </section>
    </>
  );
}
