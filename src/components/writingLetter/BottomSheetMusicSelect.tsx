"use client";

/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchBgmList } from "@/hooks/useFetchBgmList";
import Button from "../button";

interface BottomSheetMusicSelectProps {
  onSelect: (musicTitle: string, musicUrl: string) => void;
  unmount: () => void;
}

const BottomSheetMusicSelect = ({
  onSelect,
  unmount,
}: BottomSheetMusicSelectProps) => {
  const [musicList, setMusicList] = useState<{ name: string; url: string }[]>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMusicList = async () => {
      try {
        const bgms = await fetchBgmList();
        setMusicList(bgms);
      } catch (error) {
        console.error("BGM 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMusicList();
  }, []);

  const handleSelect = (index: string, title: string, url: string) => {
    setSelectedIndex(index);
    onSelect(title, url);
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

        {loading ? (
          <ul className="flex-1 space-y-2 overflow-y-auto p-2">
            {[1, 2, 3, 4].map((skeletonIndex) => (
              <li
                key={skeletonIndex}
                className="animate-pulse rounded-lg bg-gray-100 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-3/5 rounded bg-gray-300" />
                  <Image
                    src="/icons/uncheck.png"
                    alt="미체크 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex-1 space-y-2 overflow-y-auto p-2">
            {musicList.map((item, index) => (
              <li
                key={index}
                className={`rounded-lg ${
                  selectedIndex === index.toString()
                    ? "bg-primary-50 text-Title02-M text-line-900"
                    : "bg-gray-100 text-Title02-M text-line-900"
                }`}
              >
                <button
                  onClick={() =>
                    handleSelect(index.toString(), item.name, item.url)
                  }
                  className="flex w-full items-center justify-between p-5 text-left"
                  aria-pressed={selectedIndex === index.toString()}
                >
                  <span className="truncate">{item.name}</span>
                  <Image
                    src={
                      selectedIndex === index.toString()
                        ? "/icons/checked.png"
                        : "/icons/uncheck.png"
                    }
                    alt={
                      selectedIndex === index.toString()
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
        )}

        <footer className="mt-8 flex w-full flex-col items-center gap-4">
          <Button buttonType="Primary" className="w-full" onClick={unmount}>
            완료
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default BottomSheetMusicSelect;
