"use client";

import instance from "@/api/instance";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import useLocalStorage from "@/hooks/useLocalStorage";
import OpenLetterImage from "@/components/openLetter/OpenLetterImage";

const Page = () => {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const defaultImage = "/photo/photo.png";
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [token] = useLocalStorage("token");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  interface Letter {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    bgmUrl: string;
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
      try {
        const response = await instance.get<Letter>(`/letters/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLetter(response.data);
      } catch (error) {
        console.error("Error fetching letter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [id, token, receiverId]);

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
            <OpenLetterImage defaultImage={letter?.imageUrl || defaultImage} />

            <button
              onClick={handlePlayMusic}
              className="mr-3 flex w-[162px] items-center justify-start gap-2 rounded-full bg-primary-100 px-2 py-2 text-Body02-M"
            >
              <Image
                src={isPlaying ? "/icons/Pause_28.png" : "/icons/Music_28.png"}
                alt="노래 아이콘"
                width={24}
                height={24}
              />
              <span className="w-[100px] truncate text-left">
                {letter?.bgmUrl ? "음악 재생 중..." : "음악 없음"}
              </span>
            </button>

            <header className="flex w-full flex-col space-y-4 px-4 pt-6">
              <div className="w-full">
                <div className="w-full max-w-md border-none bg-transparent font-handwriting text-3xl text-black placeholder-grey-600 focus:outline-none">
                  {letter?.title}
                </div>
              </div>
            </header>

            <div className="w-full flex-1">
              <div className="mt-4 h-[200px] w-full resize-none rounded-lg bg-transparent pl-4 pr-4 font-handwriting text-2xl text-black placeholder-grey-600 focus:outline-none">
                {letter?.description}
              </div>
            </div>

            <div className="flex w-full justify-end">
              <div>
                {letter?.scheduleAt} {letter?.senderNickName}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
