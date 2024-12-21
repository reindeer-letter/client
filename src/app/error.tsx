"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
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
