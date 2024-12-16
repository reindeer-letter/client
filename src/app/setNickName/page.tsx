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

    router.push(
      `/writingLetter?type=${type}&receiverId=${receiverId}&nickname=${encodeURIComponent(
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
        <div className="mb-48 flex w-full flex-col items-center space-y-2">
          <div className="text-md w-full text-left text-Body02-R text-line-600">
            보내는 사람
          </div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              if (e.target.value.length <= 20) setNickname(e.target.value);
              else alert("별명은 20자 이하로 입력해주세요.");
            }}
            className="h-12 w-full rounded-lg bg-grey-800 px-4 text-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>
      </main>

      <footer className="fixed bottom-[50px] left-0 right-0 flex flex-col items-center gap-[12px] px-6">
        <Button
          buttonType={nickname.trim() ? "abled" : undefined}
          onClick={handleNext}
          disabled={!nickname.trim()}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};

export default Page;
