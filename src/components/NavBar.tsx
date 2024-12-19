"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";

interface NavBarProps {
  title: string;
  loggedBack?: string;
  guestBack?: string;
  loggedClose?: string;
  guestClose?: string;
}

// 사용 예시:
// <NavBar
//   title="별명 입력"
//   loggedBack="/letterType"
//   guestBack="/letterType"
//   loggedClose="/home"
//   guestClose="/invitaion"
// />

const NavBar = ({
  title,
  loggedBack,
  guestBack,
  loggedClose,
  guestClose,
}: NavBarProps) => {
  const router = useRouter();
  const [id] = useLocalStorage("userId");

  const isLoggedIn = !!id;

  const handleBack = () => {
    if (isLoggedIn && loggedBack) router.push(loggedBack);
    else if (!isLoggedIn && guestBack) router.push(guestBack);
    else router.back();
  };

  const handleClose = () => {
    if (isLoggedIn && loggedClose) router.push(loggedClose);
    else if (!isLoggedIn && guestClose) router.push(guestClose);
    else router.push("/");
  };

  return (
    <div className="flex items-center justify-between px-4 py-10">
      <button
        aria-label="뒤로가기"
        className="text-line-300"
        onClick={handleBack}
      >
        <Image src="/Arrow-left_32.png" alt="뒤로가기" width={24} height={24} />
      </button>
      <h1 className="font-dongle text-Title01-SB text-line-700">{title}</h1>
      <button
        aria-label="닫기"
        className="pr-1 text-white"
        onClick={handleClose}
      >
        <Image src="/Close_32.png" alt="닫기" width={28} height={28} />
      </button>
    </div>
  );
};

export default NavBar;
