import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col -bg--background text-white">
      <div className="text-center*:text-Body01-M flex flex-1 flex-col items-center justify-start space-y-6 pt-36">
        {/* 상단 제목 */}
        <div className="flex flex-col items-center space-y-2">
          <p>미래의 나에게</p>
          <p>오늘의 기억을 선물하는 편지,</p>
          <Image
            src="/landing/landingTitle.png"
            alt="title"
            width={120}
            height={37}
          />
        </div>

        {/* 편지 */}
        <div>
          <Image
            src="/landing/landingLetter.png"
            alt="편지"
            width={350}
            height={221}
          />
        </div>
      </div>

      <div className="flex h-8 w-full flex-col items-center justify-end space-y-4 px-6 pb-8">
        {/* 말풍선 */}
        <div className="relative rounded bg-primary-700 px-3 py-2 text-center text-Body02-SB">
          내 편지함을 만들고 친구들에게 편지를 받아보세요!
          <div className="absolute bottom-[-8px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-primary-700" />
        </div>

        {/* 회원가입 버튼 */}

        <Link href="/signUp" className="w-full" passHref>
          <Button buttonType="abled" className="text-black">
            내 편지함 만들기
          </Button>
        </Link>

        {/* 로그인 이동 */}
        <div className="text-center text-Body02-SB text-grey-300">
          <span className="mr-1">이미 편지함이 있다면?</span>
          <a href="/login" className="text-white underline">
            로그인하고 기억 보기
          </a>
        </div>
      </div>
    </div>
  );
}
