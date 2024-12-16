"use client";

import Button from "@/components/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HighlightedText from "@/components/HighlightedText";

export default function Home() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  return (
    <div
      className="top-[117px] flex h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/background/landing.png')" }}
    >
      <HighlightedText />

      <section className="mt-8 flex flex-col items-center">
        <div className="flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full bg-grey-100 shadow-md">
          <img
            src="/images/reindeer-icon.png"
            alt="순록 아이콘"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-4 flex items-center">
          <span className="rounded-[62px] bg-White px-3 py-1 text-Title02-B text-grey-800">
            케이크
          </span>
          <p className="ml-2 text-Title01-R text-grey-800">의 편지함</p>
        </div>
      </section>

      <footer className="mt-auto flex flex-col gap-[12px] px-6 pb-[56px]">
        <Link
          href={`/letterType?receiverId=${receiverId}&receiverNickName=${receiverNickName}`}
          className="w-full"
          passHref
        >
          <Button buttonType="Primary">편지 보내기</Button>
        </Link>
        <Button buttonType="abled">로그인</Button>
      </footer>
    </div>
  );
}
