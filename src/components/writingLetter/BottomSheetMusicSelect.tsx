"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "../button";

interface BottomSheetMusicSelectProps {
  onSelect: (musicTitle: string) => void;
  unmount: () => void;
}

const BottomSheetMusicSelect = ({
  onSelect,
  unmount,
}: BottomSheetMusicSelectProps) => {
  const musicList = [
    { id: "1", title: "1노래제목이들어가는공간어디까지들어갈까1" },
    { id: "2", title: "2노래제목이들어가는공간어디까지들어갈까2" },
    { id: "3", title: "3노래제목이들어가는공간어디까지들어갈까3" },
    { id: "4", title: "4노래제목이들어가는공간어디까지들어갈까4" },
  ];

  const [selectedIndex, setSelectedIndex] = useState<string | null>("1");

  const handleSelect = (id: string, title: string) => {
    setSelectedIndex(id);
    onSelect(title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={unmount}
        role="button"
        aria-label="닫기"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") unmount();
        }}
      />

      <div
        className="animate-slideUp relative z-50 mx-auto w-full max-w-[600px] overflow-y-auto rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-lg"
        role="dialog"
        aria-labelledby="music-selector-title"
      >
        <div className="mb-2 flex items-center justify-between p-2">
          <h2 id="music-selector-title" className="text-Head text-line-700">
            배경음악
          </h2>
          <button onClick={unmount} aria-label="닫기">
            <Image
              src="/Close_32.png"
              alt="닫기 아이콘"
              width={28}
              height={28}
            />
          </button>
        </div>

        <ul className="flex-1 space-y-2 overflow-y-auto p-2">
          {musicList.map((item) => (
            <li
              key={item.id}
              className={`rounded-lg ${
                selectedIndex === item.id
                  ? "bg-primary-50 text-Title02-M text-line-900"
                  : "bg-gray-100 text-Title02-M text-line-900"
              }`}
            >
              <button
                onClick={() => handleSelect(item.id, item.title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleSelect(item.id, item.title);
                }}
                className="flex w-full cursor-pointer items-center justify-between p-5 text-left"
                aria-pressed={selectedIndex === item.id}
                aria-label={`음악 선택: ${item.title}`}
              >
                <span className="truncate">{item.title}</span>
                <Image
                  src={
                    selectedIndex === item.id
                      ? "/icons/checked.png"
                      : "/icons/uncheck.png"
                  }
                  alt={
                    selectedIndex === item.id
                      ? "체크된 아이콘"
                      : "미체크 아이콘"
                  }
                  width={24}
                  height={24}
                />
              </button>
            </li>
          ))}
        </ul>

        <footer className="mx-auto mt-8 flex w-full max-w-xl flex-col items-center justify-center gap-[12px] px-1 pb-[56px]">
          <div className="flex w-full flex-col space-y-3">
            <Button buttonType="Primary" className="w-full" onClick={unmount}>
              완료
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BottomSheetMusicSelect;
