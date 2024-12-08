"use client";

import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-grey-800 text-white">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 text-center *:text-Body01-M">
        <div className="flex flex-col items-center space-y-2">
          <p>미래의 나에게</p>
          <p>오늘의 기억을 선물해주세요!</p>
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
        <Link
          href={`/letterType${receiverId && `?receiverId=${receiverId}`}`}
          className="w-full"
          passHref
        >
          <Button buttonType="abled" className="bg-primary-700 text-black">
            편지 선물하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
