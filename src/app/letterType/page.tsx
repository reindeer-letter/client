"use client";

import { useState } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";
import PopUp from "@/components/popUp";
import useOverlay from "../../hooks/useoverlay";

const Page = () => {
  const [selected, setSelected] = useState<"TEXT" | "VOICE" | null>(null);
  const router = useRouter();
  const overlay = useOverlay();

  const handleNext = () => {
    if (!selected) {
      alert("편지 유형을 선택해주세요!");
      return;
    }
    if (selected === "VOICE") {
      // 목소리로 남기기 선택 시 모달 표시
      overlay.mount(
        <PopUp
          button="확인"
          title="준비 중 입니다"
          onConfirm={() => {
            overlay.unmount();
          }}
          onCancel={() => {
            overlay.unmount();
          }}
          unmount={overlay.unmount}
          description=""
        />,
      );
      return;
    }

    router.push(`/setNickName?type=${selected}`);
  };

  return (
    <div className="flex h-screen flex-col bg-grey-900 text-white">
      <Header />
      <header className="flex items-center justify-between px-4 py-6">
        <button
          aria-label="뒤로가기"
          className="text-white"
          onClick={() => router.back()}
        >
          <Image src="/left_arrow.png" alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className="text-lg font-semibold">편지 유형 선택</h1>
        <button
          aria-label="닫기"
          className="pr-2 text-white"
          onClick={() => router.push("/")}
        >
          <Image src="/exit.png" alt="닫기" width={18} height={18} />
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center space-y-5">
        <button
          onClick={() => setSelected("TEXT")}
          className={`flex h-[175px] w-[350px] flex-col items-center justify-center space-y-2 rounded-lg transition focus:outline-none ${
            selected === "TEXT"
              ? "bg-grey-800 ring-2 ring-white"
              : "bg-grey-800"
          }`}
          aria-label="글로 남기기"
        >
          <Image
            src={
              selected === "TEXT"
                ? "/writingText_ON.png"
                : "/writingText_OFF.png"
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
            src={selected === "VOICE" ? "/voice_ON.png" : "/voice_OFF.png"}
            alt="목소리로 남기기 아이콘"
            width={77}
            height={45}
          />
          <span className="text-sm">목소리로 남기기</span>
        </button>
      </main>

      <footer className="py-4">
        <div className="flex justify-center">
          <button
            type="submit"
            className="m-5 w-full rounded-md bg-white py-4 font-semibold text-black"
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
