"use server";

import { cookies } from "next/headers";

async function cookieStore() {
  const cookieStore = await cookies();
  return cookieStore;
}

export async function getCookie(key: string) {
  const store = await cookieStore();
  return store.get(key);
}

export async function setCookie(key: string, value: string) {
  const store = await cookieStore();
  store.set(key, value, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeCookie(key: string) {
  const store = await cookieStore();
  store.delete(key);
}
