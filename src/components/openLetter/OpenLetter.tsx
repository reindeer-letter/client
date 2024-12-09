/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ActionBar from "@/components/writingLetter/ActionBar";
import Link from "next/link";
import Image from "next/image";
import instance from "@/api/instance";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function OpenLetter() {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const { id } = useParams();
  const [token] = useLocalStorage("token");

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await instance.get<Letter>(`/letters/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLetter(response.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [id]);
  return (
    <div className="bg-custom-background flex h-screen flex-col bg-grey-900 text-white">
      <div className="p-5 px-4 pb-3">
        <Link href="/home">
          <Image
            src="/icons/backspace.svg"
            alt="backspace"
            width={24}
            height={24}
          />
        </Link>
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-between">
        <header className="flex w-full flex-col space-y-4">
          <div className="p-2 px-4 pb-4">
            <ActionBar />
          </div>
          <div className="flex w-full justify-end border-none bg-transparent p-2 px-4 font-handwriting text-sm text-black">
            <div>from: {letter?.senderNickName}</div>
          </div>
          <hr className="border-b-1 w-full border-black" />
          <div className="w-full">
            <div className="w-full max-w-md border-none bg-transparent p-2 px-4 font-handwriting text-3xl text-black placeholder-gray-500 focus:outline-none">
              {letter?.title}
            </div>
          </div>
        </header>

        <div className="w-full flex-1">
          <div className="h-full w-full resize-none rounded-lg bg-transparent p-4 font-handwriting text-2xl text-black placeholder-gray-500 focus:outline-none">
            {letter?.description}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {letter?.imageUrl && (
            <img
              src={letter.imageUrl}
              alt="Letter Image"
              className="h-auto max-w-full"
            />
          )}
        </div>
      </main>
    </div>
  );
}
