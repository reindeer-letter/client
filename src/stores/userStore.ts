import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  email: string | null;
  id: string | null;
  nickName: string | null;
  profileUrl: string | null;
};

export type UserActions = {
  login: (
    email: string,
    id: string,
    nickName: string,
    profileUrl: string,
  ) => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  email: null,
  id: null,
  nickName: null,
  profileUrl: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          login: (email, id, nickName, profileUrl) =>
            set(() => ({
              email,
              id,
              nickName,
              profileUrl,
            })),
          logout: () =>
            set(() => ({
              email: null,
              id: null,
              nickName: null,
              profileUrl: null,
            })),
        }),
        {
          name: "user-store",
        },
      ),
    ),
  );
};
