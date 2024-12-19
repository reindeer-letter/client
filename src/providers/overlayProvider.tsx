"use client";

import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useState,
} from "react";

interface OverlayContextType {
  addOverlay: (key: string, element: ReactNode) => void;
  removeOverlay: (key: string) => void;
}

export const overlayContext = createContext<OverlayContextType | null>(null);

export default function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState(new Map<string, ReactNode>());
  const addOverlay = useCallback((key: string, element: ReactNode) => {
    setOverlay((prev) => {
      const newOverlay = new Map(prev);
      newOverlay.set(key, element);
      return newOverlay;
    });
  }, []);
  const removeOverlay = useCallback((key: string) => {
    setOverlay((prev) => {
      const newOverlay = new Map(prev);
      newOverlay.delete(key);
      return newOverlay;
    });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <overlayContext.Provider value={{ addOverlay, removeOverlay }}>
      {children}
      {[...overlay.entries()].map(([key, element]) => {
        return <Fragment key={key}>{element}</Fragment>;
      })}
    </overlayContext.Provider>
  );
}
