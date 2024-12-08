"use client";

import { useState } from "react";
import "../globals.css";
import Image from "next/image";

const Page = () => {
  const [selected, setSelected] = useState<"writing" | "voice" | null>(null);

  return (
    <div className="flex h-screen flex-col bg-grey-900 text-white">
      <header className="flex items-center justify-between px-4 py-3">
        <button aria-label="뒤로가기" className="text-white">
          <Image src="/left_arrow.png" alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className="text-lg font-semibold">편지 유형 선택</h1>
        <button aria-label="닫기" className="text-white">
          <Image src="/exit.png" alt="닫기" width={24} height={24} />
        </button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-5">
        <button
          onClick={() => setSelected("writing")}
          className={`flex h-[175px] w-[350px] flex-col items-center justify-center space-y-2 rounded-lg transition focus:outline-none ${
            selected === "writing"
              ? "bg-grey-800 ring-2 ring-white"
              : "bg-grey-800"
          }`}
          aria-label="글로 남기기"
        >
          <Image
            src={
              selected === "writing"
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
          onClick={() => setSelected("voice")}
          className={`flex h-[175px] w-[350px] flex-col items-center justify-center space-y-2 rounded-lg transition focus:outline-none ${
            selected === "voice"
              ? "bg-grey-800 ring-2 ring-white"
              : "bg-grey-800"
          }`}
          aria-label="목소리로 남기기"
        >
          <Image
            src={selected === "voice" ? "/voice_ON.png" : "/voice_OFF.png"}
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
          >
            다음
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
