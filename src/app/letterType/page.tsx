"use client";

import { useState } from "react";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/button";
import NavBar from "../../components/NavBar";

const Page = () => {
  const [selected, setSelected] = useState<"TEXT" | "VOICE" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");
  const source = searchParams.get("source") || "other";

  const handleNext = () => {
    if (!selected) {
      alert("편지 유형을 선택해주세요!");
      return;
    }
    const sourceParam = source === "self" ? `&source=${source}` : "";
    router.push(
      `/setNickName?type=${selected}&receiverId=${receiverId}&receiverNickName=${receiverNickName}${sourceParam}`,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-White text-white">
      <NavBar
        title="편지 유형 선택"
        loggedBack="/home"
        guestBack="/invitation"
        loggedClose="/"
        guestClose="/invitation"
      />
      <div className="pl-4 text-left text-Head text-line-700">
        어떤 방법으로 전달하시나요?
      </div>
      <main className="align-center flex flex-1 flex-col justify-start space-y-4">
        <button
          onClick={() => setSelected("TEXT")}
          className={`ml-5 mr-5 mt-14 flex h-[221px] w-auto flex-col items-center justify-center space-y-2 rounded-[32px] transition focus:outline-none ${
            selected === "TEXT" ? "bg-primary-50" : "bg-grey-50"
          }`}
          aria-label="글"
        >
          <span className="text-grey-900">글</span>
          <Image
            src="/character/Type_letter.png"
            alt="글로 남기기 아이콘"
            width={168}
            height={155}
          />
        </button>
        <button
          onClick={() => setSelected("VOICE")}
          className={`ml-5 mr-5 mt-16 flex h-[221px] w-auto flex-col items-center justify-center space-y-2 rounded-[32px] transition focus:outline-none ${
            selected === "VOICE" ? "bg-primary-50" : "bg-grey-50"
          }`}
          aria-label="글"
        >
          <span className="text-grey-900">목소리</span>
          <Image
            src="/character/Type_voice.png"
            alt="목소리"
            width={168}
            height={155}
          />
        </button>
      </main>

      <footer className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-[12px] px-5 pb-[56px]">
        <div className="flex w-full flex-col space-y-3">
          <Button buttonType="abled" className="w-full" onClick={handleNext}>
            다음
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
