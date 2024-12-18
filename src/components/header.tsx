"use client";

import WITH_PROFILE from "@/constants/route";
import cn from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  className?: string;
  showProfile?: boolean;
}

export default function Header({ className, showProfile = true }: HeaderProps) {
  const pathName = usePathname();
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between border-b border-line-100 pb-4 pt-[52px] opacity-90",
        className,
      )}
    >
      <Link href="/" className="relative ml-5 h-[23px] w-[81px]">
        <Image
          src="/images/logo.png"
          alt="logo"
          fill
          priority
          sizes="100"
          className="hover:opacity-80"
        />
      </Link>
      {WITH_PROFILE.includes(pathName) && (
        <Link href="/myPage" className="relative mr-5 h-8 w-8">
          {showProfile && (
            <Image
              src="/icons/profile_default.png"
              alt="profile"
              fill
              priority
              sizes="32"
              className="hover:opacity-80"
            />
          )}
        </Link>
      )}
    </header>
  );
}
