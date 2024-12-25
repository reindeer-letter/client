"use client";

import { useUserStore } from "@/providers/userStoreProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LottieLetterSend from "@/components/LottieLetterSend";
import Image from "next/image";
import Button from "../button";

export default function WritingCompleteClient() {
  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const router = useRouter();
  const isPending = useUserStore((store) => store.isPending);
  const id = useUserStore((store) => store.id);

  useEffect(() => {
    if (isPending) return;
    if (id) setIsLoggedIn(true);
  }, [isPending, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBoxVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LottieLetterSend onComplete={() => setIsLottieComplete(true)} />
      {isLottieComplete && (
        <>
          <div
            className="flex min-h-screen flex-col bg-cover bg-center"
            style={{
              backgroundImage: "url('/background/writingComplete.png')",
            }}
          >
            <div className="mb-60 flex flex-1 flex-col items-center justify-center px-5">
              <h1 className="mb-4 text-3xl text-Head text-line-800">
                배달부 순록에게 전달했어요
              </h1>
              <p className="text-center text-Body01-M text-line-500">
                잊지 않고 맞춰서 배달해드릴게요!
              </p>
            </div>

            <footer className="mx-auto flex w-full max-w-xl flex-col px-5 pb-[56px]">
              <div
                className={`mb-4 flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-md ${
                  isBoxVisible ? "visible" : "invisible"
                }`}
              >
                <span className="text-Body01-M text-grey-900">
                  내 편지함을 만들고 기억을 받아보세요!
                </span>
                <button
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setIsBoxVisible(false)}
                >
                  <Image
                    src="/Close_32.png"
                    alt="닫기"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              <div className="w-full">
                <Button
                  buttonType="Primary"
                  className="w-full"
                  onClick={() => {
                    if (isLoggedIn) router.push("/home");
                    else router.push("/");
                  }}
                >
                  {isLoggedIn ? "다른 편지 작성하기" : "내 편지함 만들기"}
                </Button>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
