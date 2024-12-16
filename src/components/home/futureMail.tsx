import formateISODateToYYYYMMDD from "@/utils/formatDate";
import Image from "next/image";

interface FutureMailProps {
  scheduledAt: string;
}

export default function FutureMail({ scheduledAt }: FutureMailProps) {
  return (
    <section className="relative mx-auto block h-[221px] w-[350px] selection:bg-none">
      <Image src="/images/sealed-letter.png" alt="Mail" priority fill />
      <section className="absolute h-full w-full rounded-lg bg-black bg-opacity-80" />
      <header className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
        <Image
          src="/icons/lock.png"
          alt="clock"
          width={48}
          height={48}
          sizes="48"
          priority
        />
        <div className="text-center text-Body01-M text-grey-100">{`${formateISODateToYYYYMMDD(scheduledAt)}`}</div>
      </header>
    </section>
  );
}
