"use client";

import instance from "@/api/instance";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
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
 * T: 응답 데이터에서 item 하나의 타입
 * U: 요청 바디 타입
 *
 * @param route API 경로
 * @param method HTTP 메소드
 * @param body 요청 바디
 * @returns 응답 데이터, 로딩 상태, 에러
 */
export default function useInfiniteFetch<T>({ route }: UseInfiniteFetchType) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();
  const [hasMore, setHasMore] = useState(true);
  const [token] = useLocalStorage("token");

  const fetchMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const params = new URLSearchParams({ page: String(page), limit: "3" });
        const newRoute = `${route}?${params.toString()}`;
        const response = await instance.get<InfiniteFetchReturnType<T>>(
          newRoute,
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
        if (isAxiosError(error))
          setError(new Error(error.response?.data.message));
        else setError(new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [route, page, token]);

  return { data, isLoading, error, fetchMore, isError, hasMore };
}
