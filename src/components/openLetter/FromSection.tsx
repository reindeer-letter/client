"use client";

import { openLetters } from "@/types/openLetters";

interface FromSectionProps {
  letter: openLetters;
}

const FromSection = ({ letter }: FromSectionProps) => {
  return (
    <header className="flex w-full flex-col space-y-4 px-4 pt-3">
      <div className="w-full text-right font-handwriting text-xl text-grey-400">
        {letter?.createdAt && letter?.senderNickname ? (
          <>
            {new Date(letter.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            에 {letter.senderNickname}가
          </>
        ) : (
          "작성자 정보 없음"
        )}
      </div>
      <div className="w-full text-right font-handwriting text-xl text-grey-400">
        {letter?.scheduleAt
          ? new Date(letter.scheduleAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })
          : ""}
      </div>
    </header>
  );
};

export default FromSection;
