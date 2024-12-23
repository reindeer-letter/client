"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLetterStore } from "@/providers/letterStoreProvider";
import { formatDateStringToYYYYMMDD } from "@/utils/formatDate";

interface UncompletedMailProps {
  draftId: number;
  receiverId: number;
  receiverNickName: string;
  title: string;
  senderNickname: string;
  scheduledAt: string;
  description: string;
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  imageUrl: string[];
}

export default function UncompletedMail({
  draftId,
  receiverId,
  receiverNickName,
  senderNickname,
  title,
  scheduledAt,
  description,
  bgmUrl,
  category,
  imageUrl,
}: UncompletedMailProps) {
  const router = useRouter();
  const setLetter = useLetterStore((store) => store.setLetter);

  const handleClick = () => {
    setLetter({
      draftId,
      title,
      description,
      imageUrl,
      bgmUrl,
      receiverId,
      category,
      scheduledAt,
      senderNickname,
      receiverNickName,
    });
    const searchParams = new URLSearchParams();
    searchParams.append("draftMode", "true");
    searchParams.append("receiverId", receiverId.toString());
    searchParams.append("senderNickname", senderNickname);
    console.log(`/writingLetter?${searchParams.toString()}`);
    router.push(`/writingLetter?${searchParams.toString()}`);
  };
  return (
    <button
      onClick={handleClick}
      className="relative mx-auto block h-[221px] w-[350px] selection:bg-none hover:opacity-70"
    >
      <Image src="/images/letter.png" alt="Mail" priority fill />
      <section className="relative h-full w-full">
        <section className="absolute left-0 right-0 top-9 flex items-center justify-center">
          <div className="w-[210px] truncate text-center text-Body01-M text-grey-900">
            {title}
          </div>
        </section>
        <footer className="absolute bottom-3 left-0 right-0 text-center text-Body02-M text-line-700">
          <section>TO. {receiverNickName}</section>
          <section>{formatDateStringToYYYYMMDD(scheduledAt)}</section>
        </footer>
      </section>
    </button>
  );
}
