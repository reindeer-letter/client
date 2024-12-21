import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type LetterState = {
  title: string;
  description: string;
  imageUrl: string;
  bgmUrl: string;
  receiverId: number;
  category: "TEXT" | "VOICE";
  isOpen: boolean;
  scheduledAt: string;
  senderNickName: string;
};

export type LetterActions = {
  setLetter: (letter: LetterState) => void;
  resetLetter: () => void;
};

export type LetterStore = LetterState & LetterActions;

export const defaultInitState: LetterState = {
  title: "",
  description: "",
  imageUrl: "",
  bgmUrl: "",
  receiverId: 0,
  category: "TEXT",
  isOpen: false,
  scheduledAt: "",
  senderNickName: "",
};

export const createLetterStore = (
  initState: LetterState = defaultInitState,
) => {
  return createStore<LetterStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          setLetter: (letter) =>
            set(() => ({
              ...letter,
            })),
          resetLetter: () =>
            set(() => ({
              ...defaultInitState,
            })),
        }),
        {
          name: "letter-store",
          storage: createJSONStorage(() => sessionStorage),
        },
      ),
    ),
  );
};
