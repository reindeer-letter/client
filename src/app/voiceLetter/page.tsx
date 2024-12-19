"use client";

import instance from "@/api/instance";
import { useState } from "react";
import "../globals.css";
import Image from "next/image";
import PopUp from "@/components/popUp";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/button";
import useOverlay from "@/hooks/useoverlay";
import CalendarModal from "@/components/writingLetter/CalendarModal";
import NavBar from "@/components/NavBar";
import { calculateDaysDifference, formatDate } from "@/utils/dateUtils";
import { formatDateStringToISO } from "@/utils/formatDateStringToISO";

const Page = () => {
  const overlay = useOverlay();
  const today = new Date();
  const todayFormatted = formatDate(today);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("type");
  const nickname = searchParams.get("nickname");
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const daysDifference = calculateDaysDifference(selectedDate);

  const handleSubmitLetter = async () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!nickname) {
      alert("닉네임이 없습니다. 다시 시도해주세요.");
      return;
    }

    try {
      const scheduledAt = formatDateStringToISO(selectedDate);
      const response = await instance.post("/letters", {
        title,
        description,
        imageUrl: "https://example.com/image.jpg",
        bgmUrl: "https://example.com/music.mp3",
        category,
        receiverId: Number(receiverId),
        isOpen: false,
        scheduledAt,
        senderNickName: nickname,
      });

      if (response.status === 201) {
        overlay.unmount();
        router.push(`/writingComplete?nickname=${receiverNickName}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        alert(`편지 작성 실패: ${JSON.stringify(error.response?.data)}`);
    }
  };

  const handleOpenPopUp = () => {
    overlay.mount(
      <PopUp
        button="전달하기"
        description="한 번 보낸 기억은 취소할 수 없습니다."
        title="기억을 전달할까요?"
        onConfirm={handleSubmitLetter}
        onCancel={() => overlay.unmount()}
        unmount={overlay.unmount}
      />,
    );
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-White text-white"
      style={{ backgroundImage: "url('/background/Letter-Texture.png')" }}
    >
      <NavBar
        title="작성하기"
        loggedBack="/setNickName"
        guestBack="/setNickName"
        loggedClose="/home"
        guestClose="/invitation"
      />

      <main className="bg-custom-background flex w-full flex-1 flex-col px-4 pb-4">
        <div className="relative mb-4 h-[300px] w-full overflow-x-auto pt-6">
          <div className="ml-4 flex w-full gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative flex h-[240px] w-[240px] flex-shrink-0 items-center justify-center overflow-visible rounded-lg"
              >
                <Image
                  src={`/photo/photo${index}.png`}
                  alt={`사진 ${index}`}
                  width={274}
                  height={312}
                />

                <div className="absolute left-[50%] top-[-24px] z-10 -translate-x-1/2">
                  <Image
                    src="/photo/tape_blue.png"
                    alt="테이프 위쪽"
                    width={81}
                    height={40}
                  />
                </div>

                <div className="absolute bottom-[-16px] left-[50%] z-10 -translate-x-1/2">
                  <Image
                    src="/photo/tape_yellow.png"
                    alt="테이프 아래쪽"
                    width={102}
                    height={40}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <header className="flex w-full flex-col space-y-4 px-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full max-w-md border-none bg-transparent font-handwriting text-3xl text-black placeholder-grey-600 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </header>
      </main>

      <footer className="mx-auto w-full bg-primary-200 px-5 pb-[40px] pt-6">
        <div className="flex w-full flex-col">
          <div className="ml-4 flex">
            <button
              className="flex items-center gap-1 rounded-full bg-primary-100 px-6 py-2 text-Body02-M"
              onClick={() => setIsCalendarOpen(true)}
            >
              <Image
                src="/icons/Reservation_28.png"
                alt="달력 아이콘"
                width={24}
                height={24}
              />
              <span>{selectedDate || todayFormatted}</span>
            </button>
          </div>

          <div className="w-full px-2 py-4">
            <Button
              buttonType="abled"
              onClick={handleOpenPopUp}
              className="w-full text-primary-200"
            >
              {daysDifference !== null
                ? daysDifference === 0
                  ? "오늘 편지 보내기"
                  : `${daysDifference}일 뒤 편지 보내기`
                : "오늘 편지 보내기"}
            </Button>
          </div>
        </div>
      </footer>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Page;
