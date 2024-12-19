"use client";

import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const [isMount, setIsMount] = useState(false);

  const setLocalStorage = useCallback(
    (value: string | null) => {
      if (value === null) {
        window.localStorage.removeItem(key);
        setValue(null);
        return;
      }
      window.localStorage.setItem(key, value);
      setValue(value);
    },
    [key],
  );

  useEffect(() => {
    setIsMount(true);
  }, [key]);

  if (!isMount) return [null, setLocalStorage] as const;

  return [value, setLocalStorage] as const;
}
