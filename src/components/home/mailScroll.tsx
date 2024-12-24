"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetLettersMyLettersResponse } from "@/types/letters";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import MailScrollSkeleton from "@/app/home/skeletons/mailScrollSkeleton";
import FutureMail from "./futureMail";
import IntersectionArea from "../intersectionArea";
import Button from "../button";
import EmptyMail from "./emtpyMail";
import Mail from "./mail";

interface MailScrollProps {
  route: string;
}

export default function MailScroll({ route }: MailScrollProps) {
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
  if (data && data.length === 0 && !isLoading) return <EmptyMail />;
  return (
    <section className="mt-4 flex flex-col gap-7 pb-[208px]">
      {data
        ? data.map(
            ({
              id,
              title,
              isDelivered,
              scheduledAt,
              senderNickname,
              isOpen,
            }) => {
              if (!isDelivered && scheduledAt)
                return <FutureMail key={id} scheduledAt={scheduledAt} />;
              return (
                <Mail
                  key={id}
                  id={id}
                  nickName={senderNickname}
                  title={title}
                  scheduledAt={scheduledAt}
                  isOpen={isOpen}
                />
              );
            },
          )
        : null}
      {(!data || isLoading) && <MailScrollSkeleton />}
      {hasMore && !isLoading && <IntersectionArea func={fetchMore} />}
    </section>
  );
}
