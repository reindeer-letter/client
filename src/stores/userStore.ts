import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

// user 데이터를 관리하는 store
// isPending는 로그인 요청이 진행중인지를 나타내는 상태, userDataProvider에서 관리
export type UserState = {
  email: string | null;
  id: number | null;
  nickName: string | null;
  profileUrl: string | null;
  isPending: boolean;
};

export type UserActions = {
  login: (
    email: string,
    id: number,
    nickName: string,
    profileUrl: string,
  ) => void;
  setLoading: (isPending: boolean) => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  email: null,
  id: null,
  nickName: null,
  profileUrl: null,
  isPending: false,
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
          setLoading: (isPending) =>
            set(() => ({
              isPending,
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
