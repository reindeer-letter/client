"use client";

import Header from "@/components/header";
import "../globals.css";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex h-screen flex-col bg-grey-900 text-white">
      <Header />
      <header className="flex items-center justify-between px-4 py-6">
        <button aria-label="뒤로가기" className="text-white">
          <Image src="/left_arrow.png" alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className="font-dongle text-lg">편지작성</h1>
        <button aria-label="닫기" className="pr-2 text-white">
          <Image src="/exit.png" alt="닫기" width={18} height={18} />
        </button>
      </header>

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center justify-between px-4 pb-4 pt-8">
        <header className="flex w-full flex-col space-y-4 px-4">
          <div className="flex items-center space-x-4">
            <button aria-label="음악">
              <Image
                src="/writingletter/music.png"
                alt="음악"
                width={24}
                height={24}
              />
            </button>
            <button aria-label="사진 추가">
              <Image
                src="/writingletter/add_photo.png"
                alt="사진 추가"
                width={24}
                height={24}
              />
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Image
                src="/writingletter/location.png"
                alt="위치 아이콘"
                width={24}
                height={24}
              />
              <span>서울특별시 한남동</span>
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full max-w-md border-none bg-transparent font-handwriting text-2xl text-black placeholder-gray-500 focus:outline-none"
            />
          </div>
        </header>

        <div className="w-full flex-1">
          <textarea
            placeholder="내용을 입력하세요"
            className="h-full w-full resize-none rounded-lg bg-transparent p-4 font-handwriting text-Title01-M text-base text-black placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-700 py-4 font-semibold text-white"
          >
            편지 보내기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Page;
