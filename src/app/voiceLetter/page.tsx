"use client";

import instance from "@/api/instance";
import { useEffect, useState } from "react";
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
import VoiceRecorder from "@/components/voiceLetter/VoiceRecorder";
import useVoiceUpload from "@/hooks/useVoiceUpload";

const Page = () => {
  const overlay = useOverlay();
  const today = new Date();
  const todayFormatted = formatDate(today);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const receiverId = searchParams.get("receiverId");
  const senderNickname = searchParams.get("senderNickname");

  const defaultImage = "/photo/photo_tape.png";
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");

  const { uploadVoice } = useVoiceUpload(setAudioUrl);

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

  useEffect(() => {
    if (!receiverId || !senderNickname) router.push("/");
  }, [receiverId, router, senderNickname]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      console.log("녹음 완료, 업로드 시작"); // 디버깅용
      const url = await uploadVoice(audioBlob);
      console.log("업로드된 URL:", url); // 디버깅용
      setAudioUrl(url);
    } catch (error) {
      console.error("음성 파일 업로드 실패:", error);
      alert("음성 파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSendLetter = async () => {
    console.log("현재 상태:", { title, audioUrl }); // 디버깅용

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!audioUrl) {
      alert("음성 녹음이 필요합니다.");
      return;
    }

    try {
      const payload = {
        title,
        description: "",
        imageUrl: uploadedImageUrl || null,
        bgmUrl: null,
        category: "VOICE" as const,
        receiverId: Number(receiverId),
        isOpen: false,
        scheduledAt: finalDate,
        senderNickName: senderNickname?.trim() || "익명의 친구",
        audioUrl,
      };

      console.log("전송할 데이터:", payload); // 디버깅용

      const response = await instance.post("/letters", payload);
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
        loggedBack={`/setNickName?${searchParams.toString()}`}
        guestBack={`/setNickName?${searchParams.toString()}`}
        loggedClose="/home"
        guestClose="/invitation"
      />

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center px-4">
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
        <div className="flex-1" />
        <div className="mb-5">
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        </div>
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
                  : `${daysDifference} 뒤 편지 보내기`
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
