"use client";

import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  });

  const setLocalStorage = useCallback(
    (value: string) => {
      window.localStorage.setItem(key, value);
      setValue(value);
    },
    [key],
  );

  useEffect(() => {
    setValue(window.localStorage.getItem(key));
  }, [key]);

  return [value, setLocalStorage] as const;
}
