import formateISODateToYYYYMMDD from "@/utils/formatDate";
import Image from "next/image";

interface FutureMailProps {
  scheduledAt: string;
}

export default function FutureMail({ scheduledAt }: FutureMailProps) {
  return (
    <section className="relative mx-auto block h-[221px] w-[350px] selection:bg-none">
      <Image src="/images/letter.svg" alt="Mail" priority fill />
      <section className="absolute h-full w-full">
        <Image
          src="/images/sealing-wax.png"
          alt="sealingWax"
          priority
          width={106}
          height={101}
          sizes="100"
          className="mx-auto mt-20 focus:bg-none"
        />
      </section>
      <section className="absolute h-full w-full bg-black bg-opacity-50" />
      <header className="absolute left-0 right-0 top-9 flex items-center justify-center">
        <div className="text-center text-Body01-SB text-white">{`${formateISODateToYYYYMMDD(scheduledAt)}에 열리는 기억`}</div>
      </header>
    </section>
  );
}
