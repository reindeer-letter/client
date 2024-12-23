"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type RecordingState = "IDLE" | "RECORDING" | "COMPLETED" | "PLAYING";

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder = ({ onRecordingComplete }: VoiceRecorderProps) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("IDLE");
  const [recordingTime, setRecordingTime] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (recordingState === "RECORDING")
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recordingState === "IDLE") setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordingState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current = new Audio(audioUrl);
        await onRecordingComplete(audioBlob);
      };

      mediaRecorder.start();
      setRecordingState("RECORDING");
    } catch (err) {
      console.error("녹음을 시작할 수 없습니다:", err);
      alert("마이크 접근 권한이 필요합니다.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === "RECORDING") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecordingState("COMPLETED");
    }
  };

  useEffect(() => {
    if (mediaRecorderRef.current)
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current = new Audio(audioUrl);
        onRecordingComplete(audioBlob);
      };
  }, [onRecordingComplete]);

  const playRecording = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setRecordingState("PLAYING");
      setPlaybackTime(0);

      timerRef.current = setInterval(() => {
        setPlaybackTime((prev) => prev + 1);
      }, 1000);

      audioRef.current.onended = () => {
        setRecordingState("COMPLETED");
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  };

  const restartRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    startRecording();
  };

  return (
    <div className="inline-flex h-[100px] items-center justify-center gap-4 p-5">
      {recordingState === "IDLE" ? (
        <div className="flex items-center justify-start gap-2 overflow-hidden rounded-[62px] border border-[#d4d9d9] bg-white p-3">
          <Image
            src="/icons/Record_start_36.png"
            alt="녹음 시작"
            width={36}
            height={36}
            onClick={startRecording}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-start gap-1 overflow-hidden rounded-[62px] border border-[#d4d9d9] bg-white py-3 pl-3 pr-4">
            <div className="relative h-9 w-9 overflow-hidden">
              {recordingState === "RECORDING" && (
                <Image
                  src="/icons/Record_stop_36.png"
                  alt="녹음 중지"
                  width={36}
                  height={36}
                  onClick={stopRecording}
                  className="cursor-pointer"
                />
              )}
              {(recordingState === "COMPLETED" ||
                recordingState === "PLAYING") && (
                <Image
                  src="/icons/play.png"
                  alt={recordingState === "PLAYING" ? "재생 중" : "재생"}
                  width={36}
                  height={36}
                  onClick={playRecording}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div
              className={`font-['Pretendard'] text-xl font-normal leading-loose ${
                recordingState === "COMPLETED"
                  ? "text-[#999999]"
                  : "text-[#282828]"
              }`}
            >
              {recordingState === "PLAYING"
                ? formatTime(playbackTime)
                : formatTime(recordingTime)}
            </div>
          </div>
          {(recordingState === "COMPLETED" || recordingState === "PLAYING") && (
            <div className="flex items-center justify-start gap-2 overflow-hidden rounded-[62px] border border-[#d4d9d9] bg-white p-3">
              <div className="relative h-9 w-9 overflow-hidden">
                <Image
                  src="/icons/restart.png"
                  alt="다시 녹음"
                  width={36}
                  height={36}
                  onClick={restartRecording}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VoiceRecorder;
