import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="top-[117px] flex h-screen flex-col bg-firstLanding bg-cover bg-center">
      <div className="mt-[117px] flex flex-col items-center justify-center gap-[22px]">
        {/* 텍스트 */}
        <div className="flex items-center justify-center gap-2 text-Body01-R text-primary-200">
          <span>미래의 </span>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-1/2 top-[-3px] h-[2px] w-[44px] -translate-x-1/2 bg-primary-200" />
            <span className="z-10 px-4 py-1 text-[20px] leading-none">나</span>
            <div className="absolute bottom-[-3px] left-1/2 h-[2px] w-[44px] -translate-x-1/2 bg-primary-200" />
          </div>
          <span>에게 선물하는 오늘의 기억</span>
        </div>

        <Image
          src="/landing/title.png"
          alt="순록의 편지"
          width={212}
          height={60}
        />
      </div>

      {/* 버튼 영역 */}
      <footer className="mt-auto flex w-full flex-col items-center gap-[12px] px-[20px] pb-[56px] pt-[16px] *:text-Title01-SB">
        <Link
          href="/signUp"
          className="flex w-full items-center justify-center"
          passHref
        >
          <Button
            buttonType="Primary"
            className="h-[62px] w-full rounded-[60px] text-center"
          >
            내 편지함 만들기
          </Button>
        </Link>

        <Link
          href="/login"
          className="flex w-full items-center justify-center"
          passHref
        >
          <Button
            buttonType="abled"
            className="h-[62px] w-full rounded-[60px] text-center"
          >
            로그인
          </Button>
        </Link>
      </footer>
    </div>
  );
}
