"use client";

import Image from "next/image";

interface EmptyMailProps {
  description: string;
}

export default function EmptyMail({ description }: EmptyMailProps) {
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
        {description}
      </span>
    </section>
  );
}
