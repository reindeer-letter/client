"use client";

import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  if (isAxiosError(error) && error.response?.status === 401) {
    router.push("/login");
    return null;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-linkLanding bg-cover bg-center">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-line-800">{error.message}</h1>
      </div>
      <Link
        href="/"
        className="rounded-[60px] bg-line-100 px-4 py-2 text-line-700 hover:bg-line-200"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
