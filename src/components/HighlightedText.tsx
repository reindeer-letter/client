import Image from "next/image";

export default function HighlightedText() {
  return (
    <>
      <div className="mt-[95px] flex items-center justify-center gap-2 text-Body01-R text-primary-200">
        <span>미래의 </span>
        <div className="relative flex items-center justify-center">
          <div className="absolute left-1/2 top-[-3px] h-[2px] w-[44px] -translate-x-1/2 bg-primary-200" />
          <span className="z-10 px-4 py-0 font-handwriting text-[24px] leading-none">
            나
          </span>
          <div className="absolute bottom-[-3px] left-1/2 h-[2px] w-[44px] -translate-x-1/2 bg-primary-200" />
        </div>
        <span>에게 선물하는 오늘의 기억</span>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Image src="/logo.png" alt="로고" width={260} height={110} />
      </div>
    </>
  );
}
