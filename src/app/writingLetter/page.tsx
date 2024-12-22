"use client";

import instance from "@/api/instance";
import { useState } from "react";
import "../globals.css";
import ImageUploader from "@/components/writingLetter/ImageUploader";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button";
import NavBar from "@/components/NavBar";
import { calculateDaysDifference, formatDate } from "@/utils/dateUtils";
import { formatDateStringToISO } from "@/utils/formatDateStringToISO";
import useOverlay from "@/hooks/useoverlay";
import BottomSheetMusicSelect from "@/components/writingLetter/BottomSheetMusicSelect";
import PopUp from "@/components/popUp";
import Image from "next/image";
import CalendarModal from "@/components/writingLetter/CalendarModal";

const Page = () => {
  const overlay = useOverlay();
  const today = new Date();
  const todayFormatted = formatDate(today);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("type");
  const receiverId = searchParams.get("receiverId");
  const authToken = localStorage.getItem("token");
  const storedNickname = localStorage.getItem("nickName");

  const defaultImage = "/photo/photo.png";
  const initialImages = [
    { id: "image1", url: "" },
    { id: "image2", url: "" },
    { id: "image3", url: "" },
  ];
  const [uploadedImages, setUploadedImages] = useState(initialImages);
  const [selectedMusic, setSelectedMusic] = useState<string>("노래 제목");

  const handleUploadSuccess = (index: number, url: string) => {
    const newImages = [...uploadedImages];
    newImages[index].url = url;
    setUploadedImages(newImages);
  };

  const daysDifference = calculateDaysDifference(selectedDate);
  const formattedDate = formatDateStringToISO(selectedDate);
  const finalDate = selectedDate
    ? formattedDate
    : formatDateStringToISO(todayFormatted);

  const openMusicSelector = () => {
    overlay.mount(
      <BottomSheetMusicSelect
        onSelect={(title: string) => {
          setSelectedMusic(title);
        }}
        unmount={overlay.unmount}
      />,
    );
  };

  const handleSendLetter = async () => {
    if (!title.trim() || !description.trim()) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    if (uploadedImages.every((image) => !image)) {
      alert("적어도 하나의 이미지를 업로드해주세요.");
      return;
    }

    try {
      const payload = {
        title,
        description,
        images: uploadedImages.filter((image) => image),
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
      alert("편지 전송에 실패했습니다. 다시 시도해주세요.");
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
        <div className="no-scrollbar flex w-full flex-row-reverse space-x-4 space-x-reverse overflow-x-auto px-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="shrink-0">
              <ImageUploader
                defaultImage={defaultImage}
                onUploadSuccess={(url) =>
                  handleUploadSuccess(
                    Number(image.id.replace("image", "")),
                    url,
                  )
                }
              />
            </div>
          ))}
        </div>

        <header className="flex w-full flex-col space-y-4 px-4 pt-6">
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

        <div className="w-full flex-1">
          <textarea
            placeholder="내용을 입력하세요"
            className="mt-4 h-[200px] w-full resize-none rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-2xl text-black placeholder-grey-600 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </main>

      <footer className="mx-auto w-full bg-primary-200 px-5 pb-[30px] pt-6">
        <div className="flex w-full flex-col">
          <div className="flex justify-between gap-3">
            <button
              className="ml-3 flex w-full items-center justify-center gap-1 rounded-full bg-primary-100 px-2 py-2 text-Body02-M"
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

            <button
              onClick={openMusicSelector}
              className="mr-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary-100 px-2 py-2 text-Body02-M"
            >
              <Image
                src="/icons/Music_28.png"
                alt="노래 아이콘"
                width={24}
                height={24}
              />
              <span className="max-w-[120px] overflow-hidden truncate whitespace-nowrap">
                {selectedMusic}
              </span>
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
    </div>
  );
};

export default Page;
