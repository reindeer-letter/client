import instance from "@/api/instance";
import { useLetterStore } from "@/providers/letterStoreProvider";
import { PostLettersDraftResponse } from "@/types/letters";
import { CanceledError } from "axios";
import { useEffect, useRef } from "react";

interface useSaveDraftProps {
  draftMode: string | null;
  draftId: number | null;
  setDraftId: (id: number) => void;
  title: string;
  description: string;
  bgmUrl: string;
  scheduledAt: string;
  receiverId: number;
  senderNickname: string;
  delay: number;
  handleInitialData: (data: {
    title: string;
    description: string;
    scheduledAt: string;
    bgmUrl: string;
  }) => void;
}

export default function useSaveDraft({
  bgmUrl,
  description,
  draftMode,
  handleInitialData,
  draftId,
  setDraftId,
  receiverId,
  scheduledAt,
  senderNickname,
  title,
  delay,
}: useSaveDraftProps) {
  const savedDraftId = useLetterStore((state) => state.draftId);
  const savedTitle = useLetterStore((state) => state.title);
  const savedDescription = useLetterStore((state) => state.description);
  const savedBgmUrl = useLetterStore((state) => state.bgmUrl);
  const savedScheduledAt = useLetterStore((state) => state.scheduledAt);
  const currentExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (draftMode === "true" && savedDraftId) {
      handleInitialData({
        bgmUrl: savedBgmUrl,
        description: savedDescription,
        scheduledAt: savedScheduledAt,
        title: savedTitle,
      });
      setDraftId(savedDraftId);
    }
  }, [
    setDraftId,
    draftMode,
    savedBgmUrl,
    savedDescription,
    savedScheduledAt,
    savedTitle,
    handleInitialData,
    savedDraftId,
  ]);

  // throttling으로 post, put 요청 보내는 훅
  useEffect(() => {
    const abortController = new AbortController();
    if (Date.now() - currentExecuted.current > delay) {
      currentExecuted.current = Date.now();
      if (!draftId)
        instance
          .post<PostLettersDraftResponse>(
            "/letters/draft",
            {
              title,
              description,
              imageUrls: [],
              bgmUrl,
              category: "TEXT",
              scheduledAt,
              receiverId,
              senderNickname,
            },
            { signal: abortController.signal },
          )
          .then((res) => {
            console.log(res.data.id);
            if (res.status === 201) setDraftId(res.data.id);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            console.error(err);
          });
      else
        instance
          .put(
            `/letters/draft/${draftId}`,
            {
              title,
              description,
              imageUrls: [],
              bgmUrl,
              category: "TEXT",
              scheduledAt,
              receiverId,
              senderNickname,
            },
            { signal: abortController.signal },
          )
          .catch((err) => {
            if (err instanceof CanceledError) return;
            console.error(err);
          });
    }
    return () => {
      abortController.abort();
    };
  }, [
    setDraftId,
    delay,
    bgmUrl,
    description,
    draftId,
    receiverId,
    scheduledAt,
    senderNickname,
    title,
  ]);
}
