"use client";

import dynamic from "next/dynamic";

const WritingCompleteClientWithNoSSR = dynamic(
  () => import("../../components/writingComplete/WritingCompleteClient"),
  { ssr: false },
);

export default function WritingComplete() {
  return (
    <>
      <div className="h-svh bg-gradient-to-b from-[#C396C2] to-[#7BA1D2]">
        <WritingCompleteClientWithNoSSR />
      </div>
    </>
  );
}
