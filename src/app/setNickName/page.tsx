"use client";

import Header from "@/components/header";
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
    <div className="flex min-h-screen flex-col bg-grey-900 text-white">
      <div className="px-4">
        <Header />
      </div>
      <NavBar
        title="별명 입력"
        loggedBack="/letterType"
        guestBack="/letterType"
        loggedClose="/home"
        guestClose="/invitaion"
      />
      <main className="flex w-full flex-1 flex-col items-center justify-start space-y-4 px-4 pt-2">
        <div className="text-md w-full text-left text-Body02-R">
          편지에 적을 별명을 입력하세요
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
