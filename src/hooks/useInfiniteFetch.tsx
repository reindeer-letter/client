"use client";

import instance from "@/api/instance";
import { CanceledError, isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage";

interface UseInfiniteFetchType {
  route: string;
}

interface InfiniteFetchReturnType<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * @description 무한 스크롤을 위한 커스텀 훅, 무한 스크롤을 위한 데이터를 가져옵니다.
 * @param route API 경로, searchParams가 있을 경우 searchParams도 함께 넣어주시면 됩니다, page와 limit는 자동으로 추가됩니다.
 * @returns 응답 데이터, 로딩 상태, 에러
 */
export default function useInfiniteFetch<T>({ route }: UseInfiniteFetchType) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();
  const [hasMore, setHasMore] = useState(false);
  const [token] = useLocalStorage("token");

  const isCancelled = useMemo(() => error instanceof CanceledError, [error]);

  const fetchMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setData(undefined);
    setPage(1);
    setHasMore(false);
    setIsError(false);
    setError(undefined);
    setIsLoading(false);
  }, [route]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const newRoute = new URL(route, process.env.NEXT_PUBLIC_API_URL);
        newRoute.searchParams.append("page", String(page));
        newRoute.searchParams.append("limit", "10");
        const response = await instance.get<InfiniteFetchReturnType<T>>(
          newRoute.pathname + newRoute.search,
          {
            signal: abortController.signal,
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setData((prev) =>
          prev ? [...prev, ...response.data.items] : response.data.items,
        );
        setHasMore(response.data.meta.page < response.data.meta.totalPages);
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
  }, [route, page, token]);

  return { data, isLoading, error, fetchMore, isError, hasMore, isCancelled };
}
