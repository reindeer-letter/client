"use client";

import { createLetterStore, LetterStore } from "@/stores/letterStore";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type LetterStoreApi = ReturnType<typeof createLetterStore>;

export const LetterStoreContext = createContext<LetterStoreApi | null>(null);

export interface LetterStoreProviderProps {
  children: ReactNode;
}

export const LetterStoreProvider = ({ children }: LetterStoreProviderProps) => {
  const storeRef = useRef<LetterStoreApi>(null);
  if (!storeRef.current) storeRef.current = createLetterStore();

  return (
    <LetterStoreContext.Provider value={storeRef.current}>
      {children}
    </LetterStoreContext.Provider>
  );
};

export const useLetterStore = <T,>(selector: (store: LetterStore) => T): T => {
  const userLetterContext = useContext(LetterStoreContext);

  if (!userLetterContext)
    throw new Error(`useUserStore must be used within a UserStoreProvider`);

  return useStore(userLetterContext, selector);
};
