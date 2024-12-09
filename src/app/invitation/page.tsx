"use client";

import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const receiverNickName = searchParams.get("receiverNickName");

  return (
    <div className="flex min-h-screen flex-col -bg--background text-white">
      <div className="px-4">
        <Header />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center space-y-6 text-center *:text-Body01-M">
        <div className="flex flex-col items-center space-y-2">
          <p>미래의 {receiverNickName || "나"}에게</p>
          <p>오늘의 기억을 선물하는 편지,</p>
          <Image
            src="/landing/landingTitle.png"
            alt="title"
            width={120}
            height={37}
          />
        </div>
        <div>
          <Image
            src="/landing/invitation.png"
            alt="편지"
            width={350}
            height={221}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-end space-y-4 px-6 pb-10">
        <Link href="/signUp" className="w-full" passHref>
          <Button buttonType="abled" className="text-black">
            내 편지함 만들기
          </Button>
        </Link>
      </div>
    </div>
  );
}
