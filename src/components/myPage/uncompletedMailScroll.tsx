"use client";

import Image from "next/image";
import useOverlay from "@/hooks/useoverlay";
import { useRouter } from "next/navigation";
import { GetLettersDraftsPaginatedResponse } from "@/types/letters";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import MailScrollSkeleton from "@/app/home/skeletons/mailScrollSkeleton";
import useMutation from "@/hooks/useMutation";
import IntersectionArea from "../intersectionArea";
import Button from "../button";
import EmptyMail from "../home/emtpyMail";
import UncompletedMail from "./uncompletedMail";
import PopUp from "../popUp";

interface MailScrollProps {
  route: string;
}

export default function UncompletedMailScroll({ route }: MailScrollProps) {
  const {
    data,
    error,
    isLoading,
    fetchMore,
    isError,
    hasMore,
    isCancelled,
    setData,
  } = useInfiniteFetch<GetLettersDraftsPaginatedResponse["items"][0]>({
    route,
  });
  const { mutate } =
    useMutation<GetLettersDraftsPaginatedResponse["items"][0]>("delete");
  const router = useRouter();
  const overlay = useOverlay();

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
    <section className="flex flex-col gap-5 pb-7">
      {data
        ? data.map(
            ({
              id,
              draftData: {
                receiverId,
                title,
                scheduledAt,
                senderNickname,
                description,
                bgmUrl,
                category,
                imageUrls,
              },
            }) => {
              return (
                <section key={id} className="flex flex-col items-center gap-3">
                  <UncompletedMail
                    draftId={id}
                    receiverId={receiverId}
                    // FIXME: receiverNickName 데이터 오면 수정
                    receiverNickName={senderNickname}
                    title={title}
                    senderNickname={senderNickname}
                    scheduledAt={scheduledAt}
                    description={description}
                    bgmUrl={bgmUrl}
                    category={category}
                    imageUrl={imageUrls}
                  />
                  <section className="flex w-[350px] justify-end">
                    <button
                      className="flex h-10 w-[60px] items-center justify-center rounded-[62px] bg-line-50 p-4 text-Body01-M text-line-800 hover:bg-line-100"
                      onClick={async () => {
                        const isAgree = await new Promise((resolve) => {
                          overlay.mount(
                            <PopUp
                              button="네"
                              description="삭제하시면 되돌릴 수 없습니다."
                              title="정말 삭제하시겠어요?"
                              onConfirm={() => {
                                resolve(true);
                              }}
                              onCancel={() => {
                                resolve(false);
                              }}
                              unmount={overlay.unmount}
                            />,
                          );
                        });
                        if (isAgree)
                          await mutate(data, `/letters/draft/${id}`, {
                            onMutate: () => {
                              setData((prev) =>
                                prev
                                  ? prev.filter((letter) => letter.id !== id)
                                  : [],
                              );
                            },
                            onDataHandler: setData,
                          });
                      }}
                    >
                      삭제
                    </button>
                  </section>
                </section>
              );
            },
          )
        : null}
      {(!data || isLoading) && <MailScrollSkeleton />}
      {hasMore && !isLoading && <IntersectionArea func={fetchMore} />}
    </section>
  );
}
