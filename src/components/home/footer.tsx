"use client";

import Image from "next/image";
import Button from "@/components/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import useOverlay from "@/hooks/useoverlay";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import PopUp from "../popUp";

// TODO: 소셜 공유 기능 추가

export default function Footer() {
  const router = useRouter();
  const [id] = useLocalStorage("userId");
  const [nickName] = useLocalStorage("nickName");
  const overlay = useOverlay();

  const handleShare = useCallback(async () => {
    const currentUrl = new URL("invitation", window.location.origin);
    currentUrl.searchParams.set("receiverId", String(id));
    currentUrl.searchParams.set("receiverNickName", String(nickName));
    await navigator.clipboard.writeText(currentUrl.toString());
    overlay.mount(
      <PopUp
        title="링크 복사 완료"
        unmount={overlay.unmount}
        description="링크가 복사되었습니다"
        onCancel={() => {}}
        onConfirm={() => {}}
        button="확인"
      />,
    );
  }, [id, overlay, nickName]);

  const handleGift = useCallback(() => {
    const currentUrl = new URL("letterType", window.location.origin);
    currentUrl.searchParams.set("receiverId", String(id));
    currentUrl.searchParams.set("receiverNickName", String(nickName));
    router.push(currentUrl.toString());
  }, [id, router, nickName]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto flex h-[116px] w-full max-w-[600px] justify-center gap-2 bg-grey-900 px-5 pb-12 pt-3">
      <Button
        buttonType="abled"
        onClick={handleGift}
        className="truncate text-Body02-SB md:text-Body01-SB"
      >
        나에게 편지 선물하기
      </Button>
      <Button
        buttonType="Primary"
        onClick={handleShare}
        className="flex justify-center gap-2 px-4 py-4 text-Body02-SB md:text-Body01-SB"
      >
        <section className="relative h-5 w-5 md:h-6 md:w-6">
          <Image
            src="/icons/share.png"
            alt="share"
            fill
            sizes="24px"
            priority
          />
        </section>
        내 편지함 공유하기
      </Button>
    </footer>
  );
}
