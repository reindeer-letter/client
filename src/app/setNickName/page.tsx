"use client";

import Header from "@/components/header";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import NavBar from "../../components/NavBar";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [nickname, setNickname] = useState("");

  const handleNext = () => {
    if (!nickname.trim()) {
      alert("별명을 입력해주세요!");
      return;
    }

    router.push(
      `/writingLetter?type=${type}&nickname=${encodeURIComponent(nickname)}`,
    );
  };

  return (
    <div className="flex h-screen flex-col bg-grey-900 text-white">
      <Header />
      <NavBar
        title="별명 입력"
        loggedBack="/letterType"
        guestBack="/letterType"
        loggedClose="/home"
        guestClose="/invitaion"
      />
      <main className="flex w-full flex-1 flex-col items-center justify-start space-y-4 px-4 pt-2">
        <div className="text-md w-full text-left text-grey-50">
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
