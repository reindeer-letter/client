import Image from "next/image";

export default function HighlightedText() {
  return (
    <>
      <div className="mt-[69px] flex flex-col items-center justify-center gap-[22px]">
        {/* 텍스트 */}
        <div className="flex items-center justify-center gap-2 text-Body01-R text-primary-200">
          <span>미래의 </span>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-1/2 top-[-3px] h-[2px] w-[44px] -translate-x-1/2 bg-primary-200" />
            <span className="z-10 px-4 py-1 font-handwriting text-[20px] leading-none">
              나
            </span>
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
    </>
  );
}
