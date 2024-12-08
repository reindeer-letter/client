"use client";

import { useState } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";
import PopUp from "@/components/popUp";
import useOverlay from "../../hooks/useoverlay";
import NavBar from "../../components/NavBar";

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
      <NavBar
        title="편지 유형 선택"
        loggedBack="/home"
        guestBack="/invitaion"
        loggedClose="/"
        guestClose="/invitaion"
      />

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
