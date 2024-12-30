"use client";

/* eslint-disable react/no-array-index-key */
import instance from "@/api/instance";
import { useEffect, useState } from "react";
import "../globals.css";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/button";
import useOverlay from "@/hooks/useoverlay";
import NavBar from "@/components/NavBar";
import { calculateDaysDifference, formatDate } from "@/utils/dateUtils";
import { formatDateStringToISO } from "@/utils/formatDateStringToISO";
import ImageUploader from "@/components/writingLetter/ImageUploader";
import VoiceRecorder from "@/components/voiceLetter/VoiceRecorder";
import useVoiceUpload from "@/hooks/useVoiceUpload";
import useImagePreview from "@/hooks/useImagePreview";
import ImageSlider from "@/components/imageSlider";
import dynamic from "next/dynamic";

const CalendarModal = dynamic(
  () => import("@/components/writingLetter/CalendarModal"),
);
const PopUp = dynamic(() => import("@/components/popUp"));

const Page = () => {
  const overlay = useOverlay();
  const today = new Date();
  const todayFormatted = formatDate(today);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const senderNickname = searchParams.get("senderNickname");
  const { images, handleSelectImage } = useImagePreview(3);

  const [voiceUrl, setvoiceUrl] = useState<string>("");

  const { uploadVoice } = useVoiceUpload(setvoiceUrl);

  const openCalendar = () => {
    overlay.mount(
      <CalendarModal
        onSelect={(date: string) => {
          setSelectedDate(date);
        }}
        unmount={overlay.unmount}
      />,
    );
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
      const url = await uploadVoice(audioBlob);
      setvoiceUrl(url);
    } catch (error) {
      console.error("음성 파일 업로드 실패:", error);
      alert("음성 파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSendLetter = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!voiceUrl) {
      alert("음성 녹음이 필요합니다.");
      return;
    }

    try {
      const uploadPromises = images
        .filter((item) => item.file)
        .map(async (item) => {
          const formData = new FormData();

          const file = item.file as File;
          const encodedFileName = encodeURIComponent(file.name);

          const renamedFile = new File([file], encodedFileName, {
            type: file.type,
          });

          formData.append("file", renamedFile);

          const res = await instance.post("/letters/upload/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const { imageUrl } = res.data;
          return imageUrl;
        });
      const imageUrls = await Promise.all(uploadPromises);

      const payload = {
        title,
        description: "",
        imageUrls,
        bgmUrl: null,
        category: "VOICE" as const,
        receiverId: Number(receiverId),
        isOpen: false,
        scheduledAt: finalDate,
        senderNickName: senderNickname?.trim() || "익명의 친구",
        audioUrl: voiceUrl,
      };

      const response = await instance.post("/letters", payload);
      if (response.status === 201) router.push("/writingComplete");
    } catch (error) {
      console.error("편지 전송 실패:", error);
      alert("편지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
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
        <ImageSlider>
          {images.map((item, index) => (
            <ImageUploader
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              previewUrl={item.previewUrl}
              onSelectImage={handleSelectImage}
            />
          ))}
        </ImageSlider>

        <header className="mt-6 flex w-full flex-col space-y-4 px-4">
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
              onClick={openCalendar}
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
              {isLoading
                ? "편지 보내는 중 ..."
                : daysDifference !== null
                  ? daysDifference === 0
                    ? "오늘 편지 보내기"
                    : `${daysDifference}일 뒤 편지 보내기`
                  : "오늘 편지 보내기"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
