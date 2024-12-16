"use client";

import { useState } from "react";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import PopUp from "@/components/popUp";
import Button from "@/components/button";
import useOverlay from "../../hooks/useoverlay";
import NavBar from "../../components/NavBar";

const Page = () => {
  const [selected, setSelected] = useState<"TEXT" | "VOICE" | null>(null);
  const router = useRouter();
  const overlay = useOverlay();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  const handleNext = () => {
    if (!selected) {
      alert("편지 유형을 선택해주세요!");
      return;
    }
    if (selected === "VOICE") {
      overlay.mount(
        <PopUp
          button="확인"
          title="준비 중 입니다"
          description="현재 기능은 준비 중입니다."
          onConfirm={() => {
            overlay.unmount();
          }}
          onCancel={() => {
            overlay.unmount();
          }}
          unmount={overlay.unmount}
        />,
      );
      return;
    }

    router.push(
      `/setNickName?type=${selected}&receiverId=${receiverId}&receiverNickName=${receiverNickName}`,
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
      <main className="flex flex-1 flex-col items-center justify-start space-y-4">
        <button
          onClick={() => setSelected("TEXT")}
          className={`mt-16 flex h-[221px] w-[350px] flex-col items-center justify-center space-y-2 rounded-[32px] transition focus:outline-none ${
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
          className={`mt-16 flex h-[221px] w-[350px] flex-col items-center justify-center space-y-2 rounded-[32px] transition focus:outline-none ${
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

      <footer className="fixed bottom-[50px] left-0 right-0 flex flex-col items-center gap-[12px] px-6">
        <Button buttonType="abled" onClick={handleNext}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Page;
