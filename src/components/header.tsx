"use client";

import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex h-[60px] w-full items-center justify-between px-4 pt-8 opacity-90",
        className,
      )}
    >
      <Link href="/" className="relative h-[22px] w-[67px]">
        <Image
          src="/logo.png"
          alt="logo"
          fill
          priority
          sizes="100"
          className="hover:opacity-80"
        />
      </Link>
      <Link href="/myPage" className="relative h-8 w-8">
        <Image
          src="/profile_default.png"
          alt="profile"
          fill
          priority
          sizes="32"
          className="hover:opacity-80"
        />
      </Link>
    </header>
  );
}
