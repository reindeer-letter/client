import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CanceledError, isAxiosError } from "axios";
import instance from "@/api/instance";

export default function useMutation<T, R = T>(
  method: "post" | "put" | "delete",
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const isCancelled = useMemo(() => error instanceof CanceledError, [error]);

  const mutate = useCallback(
    async (
      data: T[],
      route: string,
      {
        onDataHandler,
        onMutate,
      }: {
        onDataHandler: Dispatch<SetStateAction<T[] | undefined>>;
        onMutate: () => void;
      },
    ) => {
      setIsLoading(true);
      setIsError(false);
      try {
        onMutate();
        await instance[method]<R>(route, data);
      } catch (error) {
        onDataHandler(data);
        setIsError(true);
        if (error instanceof CanceledError) setError(error);
        else if (isAxiosError(error))
          setError(new Error(error.response?.data.message));
        else if (error instanceof Error) setError(error);
        else setError(new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setIsLoading(false);
      }
    },
    [method],
  );

  return { mutate, isLoading, isError, error, isCancelled };
}
