"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../button";

export default function Footer() {
  const router = useRouter();

  const [id] = useLocalStorage("userId");
  const [nickName] = useLocalStorage("nickName");

  const handleGift = useCallback(() => {
    const currentUrl = new URL("letterType", window.location.origin);
    currentUrl.searchParams.set("receiverId", String(id));
    currentUrl.searchParams.set("receiverNickName", String(nickName));
    router.push(currentUrl.toString());
  }, [id, router, nickName]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto flex w-full max-w-[600px] flex-col justify-center gap-3 bg-white px-5 pb-14 pt-4">
      <Button
        buttonType="Primary"
        onClick={handleGift}
        className="flex w-full items-center justify-center truncate"
      >
        내게 쓰기
      </Button>
    </footer>
  );
}
