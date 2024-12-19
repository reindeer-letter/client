"use client";

import instance from "@/api/instance";
import { CanceledError, isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage";

interface UseGetFetchType {
  route: string;
}

/**
 * @description 클라이언트 API 호출 데이터 상태를 관리하기 위한 커스텀 훅
 * @param route API 경로, searchParams가 있을 경우 searchParams도 함께 넣어주시면 됩니다.
 * @param body HTTP 요청 바디
 * @returns 응답 데이터, 로딩 상태, 에러, 에러가 취소된 경우 여부
 */
export default function useGetFetch<T>({ route }: UseGetFetchType) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();
  const [token] = useLocalStorage("token");

  const isCancelled = useMemo(() => error instanceof CanceledError, [error]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await instance.get<T>(route, {
          signal: abortController.signal,
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
        if (error instanceof CanceledError) setError(error);
        else if (isAxiosError(error))
          setError(new Error(error.response?.data.message));
        else if (error instanceof Error) setError(error);
        else setError(new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [route, token]);

  return { data, isLoading, error, isError, isCancelled };
}
