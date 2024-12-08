"use client";

import Button from "@/components/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Page() {
  const [, setUserId] = useLocalStorage("userId");
  const [, setNickName] = useLocalStorage("nickName");
  const [, setToken] = useLocalStorage("token");
  const router = useRouter();

  const handleLogout = useCallback(() => {
    setUserId(null);
    setNickName(null);
    setToken(null);
    router.push("/");
  }, [setUserId, setNickName, setToken, router]);

  return (
    // TODO: 마이페이지 구현
    <section className="fixed inset-0 flex items-center justify-center">
      <section className="w-full min-w-[375px] max-w-[600px]">
        <Button buttonType="Primary" onClick={handleLogout}>
          로그아웃
        </Button>
      </section>
    </section>
  );
}
