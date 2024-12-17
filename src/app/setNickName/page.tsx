"use client";

import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
import NavBar from "../../components/NavBar";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");
  const [nickname, setNickname] = useState("");

  const handleNext = () => {
    if (!nickname.trim()) {
      alert("별명을 입력해주세요!");
      return;
    }

    const basePath = type === "VOICE" ? "voiceLetter" : "writingLetter";
    router.push(
      `/${basePath}?type=${type}&receiverId=${receiverId}&nickname=${encodeURIComponent(
        nickname,
      )}&receiverNickName=${receiverNickName}`,
    );
  };
  return (
    <div className="flex h-screen flex-col bg-White">
      <NavBar
        title=""
        loggedBack="/letterType"
        guestBack="/letterType"
        loggedClose="/home"
        guestClose="/invitaion"
      />
      <div className="pl-4 text-left text-Head text-line-700">
        누가 보내시는 건가요?
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mb-18 flex w-full max-w-xl flex-col items-center space-y-2">
          <div className="text-md w-full text-left text-Body02-R text-line-600">
            보내는 사람
          </div>
          <input
            type="text"
            placeholder="보내시는 분의 성함, 별명 등을 입력하세요."
            value={nickname}
            onChange={(e) => {
              if (e.target.value.length <= 20) setNickname(e.target.value);
              else alert("별명은 20자 이하로 입력해주세요.");
            }}
            className="h-12 w-full border-b-2 bg-White px-4 text-Title02-M text-primary-200 placeholder-line-200 focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>
      </main>

      <footer className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-[12px] px-5 pb-[56px]">
        <div className="flex w-full flex-col space-y-3">
          <Button
            buttonType={nickname.trim() ? "abled" : undefined}
            onClick={handleNext}
            disabled={!nickname.trim()}
            className="w-full"
          >
            다음
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
