"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LottieLetterSend from "@/components/LottieLetterSend";
import useLocalStorage from "@/hooks/useLocalStorage";
import BackButton from "./BackButton";
import WritingText from "./WritingText";
import Button from "../button";

export default function WritingCompleteClient() {
  const router = useRouter();
  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const HeaderWithNoSSR = dynamic(() => import("@/components/header"), {
    ssr: false,
  });

  // 클릭 핸들러 함수
  const handleClick = () => {
    if (isLoggedIn)
      router.push("/home"); // isLoggedIn이 true일 경우 /home으로 이동
    else router.push("/signUp"); // isLoggedIn이 false일 경우 /signUp으로 이동
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <HeaderWithNoSSR />
      <BackButton isLoggedIn={isLoggedIn} />
      <LottieLetterSend onComplete={() => setIsLottieComplete(true)} />
      {isLottieComplete && (
        <>
          <div className="flex-1" />
          <WritingText />
          <div className="flex-1" />
          <div className="relative">
            {!isLoggedIn && showBubble && (
              <div className="absolute -top-[30px] left-1/2 z-10 w-[310px] -translate-x-1/2 rounded-[4px] bg-[#762222] px-[4px] py-[6px] text-black">
                <div className="absolute -bottom-[5.5px] left-1/2 h-[11px] w-[9px] -translate-x-1/2 rotate-45 transform bg-[#762222]" />
                <div className="relative z-10 text-center text-sm font-semibold text-white">
                  내 편지함을 만들고 친구들에게 편지를 받아보세요!
                  <button
                    onClick={() => setShowBubble(false)}
                    className="h-[20px] w-[20px] text-[20px] text-white"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            <div className="z-[51] mt-auto flex h-[116px] w-full justify-center p-[16px]">
              <Button
                buttonType="Primary"
                className="flex h-[56px] w-[350px] items-center justify-center rounded-md"
                onClick={handleClick}
              >
                {isLoggedIn ? "다른 편지 더 선물하기" : "내 편지함 만들기"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
