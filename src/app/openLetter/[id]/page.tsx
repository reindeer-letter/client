"use client";

/* eslint-disable react/no-array-index-key */
import instance from "@/api/instance";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";

const Page = () => {
  const defaultImage = "/photo/photo.png";
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  interface Letter {
    senderNickname: string;
    id: number;
    title: string;
    description: string;
    imageUrls: string[];
    bgmUrl: string;
    audioUrl: string;
    senderNickName: string;
    category: string;
    isOpen: boolean;
    isDeliverd: boolean;
    scheduleAt: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    receiverId: string;
    receiver: {
      id: string;
      nickName: string;
      password: string;
      email: string;
      profileImageUrl: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  useEffect(() => {
    const fetchLetter = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await instance.get<Letter>(`/letters/${id}`);
        console.log("✅ API 응답 확인:", response.data);
        console.log("✅ 이미지 URLs 확인:", response.data.imageUrls);
        setLetter(response.data);
      } catch (error) {
        console.error("Error fetching letter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [id]);

  const imageUrls = letter?.imageUrls || [];
  const isSingleImage = imageUrls.length === 1;

  const encodeUrl = (url: string) => {
    try {
      return encodeURI(url);
    } catch (error) {
      console.error("URL 인코딩 실패:", error);
      return "";
    }
  };

  const getFileName = (url: string) => {
    if (!url) return "음악 없음";
    return (
      url
        .split("/")
        .pop()
        ?.replace(/\.[^/.]+$/, "") || "음악 없음"
    );
  };

  const handlePlayMusic = () => {
    if (!letter?.bgmUrl) return;

    if (!audio) {
      const newAudio = new Audio(letter.bgmUrl);
      newAudio.addEventListener("ended", () => setIsPlaying(false));
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const renderContent = (letter: Letter | null) => {
    if (!letter) return null;

    switch (letter.category) {
      case "TEXT":
        return (
          <div className="w-full">
            <div className="mt-4 h-[200px] w-full resize-none rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-2xl text-black">
              {letter.description}
            </div>
          </div>
        );
      case "VOICE":
        return (
          <div className="flex w-full justify-center">
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

  return (
    <div
      className="flex min-h-screen flex-col bg-White text-white"
      style={{ backgroundImage: "url('/background/Letter-Texture.png')" }}
    >
      <NavBar loggedBack="/home" guestBack="/signUp" />

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center px-4 pb-4">
        {loading ? (
          <div className="text-center text-xl">로딩 중...</div>
        ) : (
          <>
            {isSingleImage ? (
              <div className="flex w-full items-center justify-center">
                <div className="relative h-[280px] w-[280px] overflow-hidden rounded-lg border border-gray-300">
                  <Image
                    src={encodeUrl(imageUrls[0])}
                    alt="단일 이미지"
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="no-scrollbar flex w-full flex-row space-x-4 overflow-x-auto px-4">
                <div style={{ display: "flex", gap: 16 }}>
                  {imageUrls.length > 0
                    ? imageUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative h-[280px] w-[280px] overflow-hidden rounded-lg border border-gray-300"
                        >
                          <Image
                            src={encodeUrl(url)}
                            alt={`이미지 ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            unoptimized
                            onError={(e) => {
                              console.error(`❌ 이미지  오류: ${url}:`, e);
                            }}
                          />
                        </div>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="relative h-[280px] w-[280px] overflow-hidden rounded-lg border border-gray-300"
                        >
                          <Image
                            src={defaultImage}
                            alt={`기본 이미지 ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                </div>
              </div>
            )}

            {letter?.bgmUrl && letter.category === "TEXT" ? (
              <div className="mt-6 flex w-full justify-start">
                <button
                  onClick={handlePlayMusic}
                  className="ml-3 flex w-auto items-center gap-2 rounded-full bg-primary-100 px-4 py-3 text-Body02-M"
                >
                  <Image
                    src={
                      isPlaying
                        ? "/icons/Muisc_Pause_28.png"
                        : "/icons/Music_Play_28.png"
                    }
                    alt="노래 아이콘"
                    width={24}
                    height={24}
                  />
                  <span className="w-[60px] truncate text-left">
                    {getFileName(letter.bgmUrl)}
                  </span>
                </button>
              </div>
            ) : null}

            <header className="flex w-full flex-col space-y-4 px-4 pt-6">
              <div className="w-full">
                <div className="w-full max-w-md border-none bg-transparent font-handwriting text-3xl text-black placeholder-grey-600 focus:outline-none">
                  {letter?.title}
                </div>
              </div>
            </header>

            {renderContent(letter)}

            <div className="mt-4 w-full text-right">
              <div className="w-full rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-xl text-[#999]">
                {letter?.createdAt && letter?.senderNickname ? (
                  <>
                    {new Date(letter.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    에 {letter.senderNickname}가
                  </>
                ) : (
                  "작성자 정보 없음"
                )}
              </div>
            </div>

            <div className="w-full text-right">
              <div className="w-full rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-xl text-[#999]">
                {letter?.scheduleAt
                  ? new Date(letter.scheduleAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })
                  : ""}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
