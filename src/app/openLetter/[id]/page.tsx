"use client";

/* eslint-disable react/no-array-index-key */
import instance from "@/api/instance";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import { openLetters } from "@/types/openLetters";
import ImageSection from "@/components/openLetter/ImageSection";
import ContentSection from "@/components/openLetter/ContentSection";
import FromSection from "@/components/openLetter/FromSection";

const Page = () => {
  const [letter, setLetter] = useState<openLetters | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await instance.get<openLetters>(`/letters/${id}`);
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

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden bg-White text-white"
      style={{ backgroundImage: "url('/background/Letter-Texture.png')" }}
    >
      <NavBar loggedBack="/home" guestBack="/signUp" />

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center overflow-x-hidden px-6 pb-4">
        {loading ? (
          <div className="text-center text-xl">로딩 중...</div>
        ) : (
          <>
            <ImageSection imageUrls={imageUrls} encodeUrl={encodeUrl} />

            {letter?.bgmUrl && letter.category === "TEXT" ? (
              <div className="mt-3 flex w-full justify-start">
                <button
                  onClick={handlePlayMusic}
                  className="ml-3 flex w-auto items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-Body02-M"
                  style={{ maxWidth: "100%" }}
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
                  <span className="text-left">
                    {getFileName(letter.bgmUrl)}
                  </span>
                </button>
              </div>
            ) : null}

            <header className="flex w-full flex-col space-y-4 px-4 pt-3">
              <div className="w-full">
                <div className="w-full max-w-md border-none bg-transparent font-handwriting text-[28px] text-grey-800 placeholder-grey-600 focus:outline-none">
                  {letter?.title}
                </div>
              </div>
            </header>
            {letter && <ContentSection letter={letter} imageUrls={imageUrls} />}
            {letter && <FromSection letter={letter} />}
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
