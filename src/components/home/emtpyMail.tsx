"use client";

import Image from "next/image";

export default function EmptyMail() {
  return (
    <section className="mx-auto mt-[120px] w-[164px] pb-[313px]">
      <Image
        src="/images/empty-mail-box.png"
        alt="reindeer-cry"
        height={132}
        width={117}
        priority
        className="mx-auto block"
      />
      <span className="mt-5 block whitespace-nowrap text-center text-Title01-M text-grey-400">
        받은 편지가 없습니다
      </span>
    </section>
  );
}
