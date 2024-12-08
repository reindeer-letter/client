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
        "flex h-[60px] w-full items-center justify-between pt-8 opacity-90",
        className,
      )}
    >
      <Link href="/" className="relative h-[22px] w-[67px]">
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
        <Link href="/myPage" className="relative h-8 w-8">
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
