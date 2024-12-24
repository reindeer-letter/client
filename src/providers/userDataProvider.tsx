"use client";

import useGetFetch from "@/hooks/useGetFetch";
import { GetAuthProfileResponse } from "@/types/profile";
import { ReactNode, useEffect } from "react";
import { isAxiosError } from "axios";
import { useUserStore } from "./userStoreProvider";

interface UserDataProviderProps {
  children: ReactNode;
}

export default function UserDataProvider({ children }: UserDataProviderProps) {
  const { data, isLoading, error, isError } =
    useGetFetch<GetAuthProfileResponse>({
      route: "/auth/profile",
    });
  const login = useUserStore((store) => store.login);
  const setLoading = useUserStore((store) => store.setLoading);
  const logout = useUserStore((store) => store.logout);

  useEffect(() => {
    if (isLoading) setLoading(true);
    else setLoading(false);

    if (isError && isAxiosError(error) && error.response?.status === 401)
      logout();

    if (!isLoading && data)
      login(data.email, data.id, data.nickName, data.profileImageUrl);
  }, [isLoading, data, login, setLoading, logout, isError, error]);

  return <>{children}</>;
}
