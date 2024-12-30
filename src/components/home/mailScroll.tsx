"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetLettersMyLettersResponse } from "@/types/letters";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import Button from "../button";
import EmptyMail from "./emtpyMail";
import InfiniteWrapper from "../infiniteWrapper";
import MailVirtualized from "./mailVirtualized";

interface MailScrollProps {
  route: string;
  type: "myLetters" | "receivedLetters";
}

export default function MailScroll({ route, type }: MailScrollProps) {
  const { data, error, isLoading, fetchMore, isError, hasMore, isCancelled } =
    useInfiniteFetch<GetLettersMyLettersResponse["items"][0]>({
      route,
    });

  const router = useRouter();
  if (isError && !isCancelled)
    return (
      <div className="mt-[120px] px-5 pb-[313px] text-center text-Body01-B text-grey-400">
        <div>편지를 불러오는 중에 오류가 발생했습니다.</div>
        <div className="text-grey-600">{error?.message}</div>
        <Image
          src="/images/reindeer-cry.png"
          alt="reindeer-cry"
          height={132}
          width={117}
          priority
          className="mx-auto mb-12 mt-12"
        />
        <Button
          buttonType="abled"
          className="bg-red hover:cursor-pointer hover:opacity-70"
          onClick={() => router.push("/login")}
        >
          다시 로그인하기
        </Button>
      </div>
    );
  if (data && data.length === 0 && !isLoading)
    return (
      <EmptyMail
        description={
          type === "myLetters"
            ? "내게 쓴 편지가 없습니다."
            : "받은 편지가 없습니다"
        }
      />
    );
  return (
    <>
      <section className="flex-1">
        <InfiniteWrapper
          data={data || []}
          hasMore={hasMore}
          fetchMore={fetchMore}
        >
          {MailVirtualized}
        </InfiniteWrapper>
      </section>
    </>
  );
}
