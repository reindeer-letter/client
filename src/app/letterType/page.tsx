"use client";

import { useState } from "react";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";
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
    <div className="flex h-screen flex-col bg-grey-900 text-white">
      <Header />
      <NavBar
        title="편지 유형 선택"
        loggedBack="/home"
        guestBack="/invitaion"
        loggedClose="/"
        guestClose="/invitaion"
      />

      <main className="flex flex-1 flex-col items-center justify-start space-y-5 pt-10">
        <button
          onClick={() => setSelected("TEXT")}
          className={`mt-16 flex h-[175px] w-[350px] flex-col items-center justify-center space-y-2 rounded-lg transition focus:outline-none ${
            selected === "TEXT"
              ? "bg-grey-800 ring-2 ring-white"
              : "bg-grey-800"
          }`}
          aria-label="글로 남기기"
        >
          <Image
            src={
              selected === "TEXT"
                ? "/letterType/writingText_ON.png"
                : "/letterType/writingText_OFF.png"
            }
            alt="글로 남기기 아이콘"
            width={77}
            height={74}
          />
          <span className="text-sm">글로 남기기</span>
        </button>
        <button
          onClick={() => setSelected("VOICE")}
          className={`flex h-[175px] w-[350px] flex-col items-center justify-center space-y-2 rounded-lg transition focus:outline-none ${
            selected === "VOICE"
              ? "bg-grey-800 ring-2 ring-white"
              : "bg-grey-800"
          }`}
          aria-label="목소리로 남기기"
        >
          <Image
            src={
              selected === "VOICE"
                ? "/letterType/voice_ON.png"
                : "/letterType/voice_OFF.png"
            }
            alt="목소리로 남기기 아이콘"
            width={77}
            height={45}
          />
          <span className="text-sm">목소리로 남기기</span>
        </button>
      </main>

      <footer className="fixed bottom-0 w-full max-w-[600px] bg-grey-900 px-5 pb-12">
        <Button
          buttonType="abled"
          onClick={handleNext}
          className="w-full text-black"
        >
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Page;
