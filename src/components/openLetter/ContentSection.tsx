"use client";

import { openLetters } from "@/types/openLetters";

interface ContentSectionProps {
  letter: openLetters;
  imageUrls: string[];
}

const ContentSection = ({ letter, imageUrls }: ContentSectionProps) => {
  const contentHeight =
    imageUrls.length > 0 ? "max-h-[200px]" : "max-h-[500px]";

  switch (letter?.category) {
    case "TEXT":
      return (
        <section
          className={`mt-2 w-full ${contentHeight} overflow-y-auto rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-[20px] text-grey-800`}
        >
          {letter.description}
        </section>
      );
    case "VOICE":
      return (
        <div className="mt-4 flex w-full justify-center">
          <audio controls aria-label="음성 메시지">
            <source src={letter.audioUrl} type="audio/mpeg" />
            <track kind="captions" srcLang="ko" />
            <p>음성을 재생할 수 없습니다.</p>
          </audio>
        </div>
      );
    default:
      return null;
  }
};

export default ContentSection;
