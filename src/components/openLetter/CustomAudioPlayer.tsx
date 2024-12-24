"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface CustomAudioPlayerProps {
  audioUrl: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();

      setIsPlaying(!isPlaying);
    }
  };

  const restartPlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (Number.isNaN(time) || !Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="mb-6 flex w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-md">
      <button
        onClick={togglePlay}
        className="flex h-8 w-8 items-center justify-center"
        aria-label={isPlaying ? "일시정지" : "재생"}
      >
        {isPlaying ? (
          <Image src="/icons/pause.png" alt="일시정지" width={14} height={14} />
        ) : (
          <Image src="/icons/play.png" alt="재생" width={24} height={24} />
        )}
      </button>

      {isPlaying && (
        <button
          onClick={restartPlay}
          className="flex h-8 w-8 items-center justify-center"
          aria-label="처음부터 재생"
        >
          <Image
            src="/icons/Record_stop_36.png"
            alt="처음부터 재생"
            width={24}
            height={24}
          />
        </button>
      )}

      <span className="text-lg font-medium text-gray-700">
        {formatTime(currentTime)}
      </span>

      <audio ref={audioRef} src={audioUrl} preload="metadata">
        <track kind="captions" srcLang="en" label="Audio captions" />
      </audio>
    </div>
  );
};

export default CustomAudioPlayer;
