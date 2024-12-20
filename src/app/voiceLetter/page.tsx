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
import ImageUploader from "@/components/writingLetter/ImageUploader";

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
  const receiverId = searchParams.get("receiverId");
  const authToken = localStorage.getItem("token");
  const storedNickname = localStorage.getItem("nickName");

  const defaultImage = "/photo/photo.png";
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };
  const handleUploadSuccess = (url: string) => {
    setUploadedImageUrl(url);
  };
  const daysDifference = calculateDaysDifference(selectedDate);
  const formattedDate = formatDateStringToISO(selectedDate);
  const finalDate = selectedDate
    ? formattedDate
    : formatDateStringToISO(todayFormatted);

  // 편지 전송
  const handleSendLetter = async () => {
    if (!title.trim() || !description.trim()) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    try {
      const payload = {
        title,
        description,
        imageUrl: uploadedImageUrl,
        bgmUrl: "https://example.com/music.mp3",
        category,
        receiverId: Number(receiverId),
        isOpen: false,
        scheduledAt: finalDate,
        senderNickName: storedNickname?.trim() || "익명의 친구",
      };

      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const response = await instance.post("/letters", payload, { headers });

      if (response.status === 201) router.push("/writingComplete");
    } catch (error) {
      console.error("편지 전송 실패:", error);

      if (axios.isAxiosError(error) && error.response?.status === 401)
        alert("인증 문제가 발생했습니다. 다시 로그인해주세요.");
      else alert("편지 전송 실패. 다시 시도해주세요.");
    }
  };

  const handleOpenPopUp = () => {
    overlay.mount(
      <PopUp
        button="전달하기"
        description="한 번 보낸 기억은 취소할 수 없습니다."
        title="기억을 전달할까요?"
        onConfirm={handleSendLetter}
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

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center px-4 pb-4">
        <ImageUploader
          defaultImage={defaultImage}
          onUploadSuccess={handleUploadSuccess}
        />

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
