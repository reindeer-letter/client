"use client";

import dynamic from "next/dynamic";

const WritingCompleteClientWithNoSSR = dynamic(
  () => import("../../components/writingComplete/WritingCompleteClient"),
  { ssr: false },
);

export default function WritingComplete() {
  return (
    <>
      <WritingCompleteClientWithNoSSR />
    </>
  );
}
