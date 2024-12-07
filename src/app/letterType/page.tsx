"use client";

import { useState } from "react";
import "../globals.css";
import Image from "next/image";

const Page = () => {
  const [selected, setSelected] = useState<"writing" | "voice" | null>(null);

  return (
    <div className="flex h-full flex-col bg-grey-900 text-white">
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
            className="h-12 w-48 rounded-lg bg-white text-black"
            aria-label="다음 버튼"
          >
            다음
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
