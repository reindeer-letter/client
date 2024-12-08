"use client";

import { CanceledError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetLettersMyLettersResponse } from "@/types/letters";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import MailScrollSkeleton from "@/app/home/skeletons/mailScrollSkeleton";
import FutureMail from "./futureMail";
import Mail from "./mail";
import IntersectionArea from "../intersectionArea";
import SealedMail from "./sealedMail";
import Button from "../button";

export default function MailScroll() {
  const { data, error, isLoading, fetchMore, isError, hasMore } =
    useInfiniteFetch<GetLettersMyLettersResponse["items"][0]>({
      route: "/letters/my",
    });
  const router = useRouter();
  if (!data && isError && !(error instanceof CanceledError))
    return (
      <div className="mb-[116px] text-center text-Body01-B text-white">
        <div>편지를 불러오는 중에 오류가 발생했습니다.</div>
        <div>{error?.message}</div>
        <Image
          src="/images/reindeer-cry.png"
          alt="reindeer-cry"
          height={372}
          width={276}
          priority
          className="mx-auto mb-12 mt-12"
        />
        <Button
          buttonType="Primary"
          className="hover:cursor-pointer hover:opacity-70"
          onClick={() => router.push("/login")}
        >
          다시 로그인하기
        </Button>
      </div>
    );
  if ((!data || data.length === 0) && !isLoading)
    return (
      <section className="relative mt-[88px]">
        <Image
          src="/images/reindeer-cry.png"
          alt="reindeer-cry"
          height={372}
          width={276}
          priority
          className="relative mx-auto mb-12 mt-12"
        />
        <section className="absolute bottom-0 left-0 right-0 top-0 flex justify-center">
          <div className="mt-[118px] w-[276px] text-center text-Title01-M text-grey-300 text-white">
            그리움의 끝은 어디까지일까,
            <br />
            손꼽아 헤아린다.
            <div className="mt-2 text-end text-Caption text-grey-600">
              시인 정광지
            </div>
          </div>
        </section>
      </section>
    );
  return (
    <section className="flex flex-col gap-7 pb-[128px]">
      {data
        ? data.map(
            ({
              id,
              title,
              isDelivered,
              scheduledAt,
              createdAt,
              receiver,
              isOpen,
            }) => {
              if (!isDelivered)
                return <FutureMail key={id} scheduledAt={scheduledAt} />;
              if (!isOpen)
                return (
                  <SealedMail
                    key={id}
                    id={id}
                    nickName={receiver.nickName}
                    title={title}
                    writtenDate={createdAt}
                  />
                );
              return (
                <section key={id}>
                  <Mail
                    id={id}
                    writtenDate={createdAt}
                    nickName={receiver.nickName}
                    title={title}
                  />
                </section>
              );
            },
          )
        : null}
      {isLoading && <MailScrollSkeleton />}
      {hasMore && !isLoading && <IntersectionArea func={fetchMore} />}
    </section>
  );
}
