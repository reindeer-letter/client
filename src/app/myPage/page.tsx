"use client";

import instance from "@/api/instance";
import { removeCookie } from "@/lib/cookie";
import { useUserStore } from "@/providers/userStoreProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Page() {
  const profileUrl = useUserStore((store) => store.profileUrl);
  const nickName = useUserStore((store) => store.nickName);
  const isPending = useUserStore((store) => store.isPending);
  const logout = useUserStore((store) => store.logout);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await instance.post("/auth/logout");
      logout();
      await removeCookie("token");
      router.push("/");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
      throw error;
    }
  }, [router, logout]);

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
          {isPending && (
            <div className="h-[240px] w-[240px] animate-pulse rounded-full bg-[#d9d9d9]" />
          )}
          {profileUrl && (
            <Image
              priority
              src={profileUrl}
              alt="profile"
              width={240}
              height={240}
              className="rounded-full bg-[#d9d9d9]"
            />
          )}
          {nickName && (
            <div className="pb-9 text-Title01-R text-grey-800">{nickName}</div>
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
