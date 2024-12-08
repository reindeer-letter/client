import formateISODateToYYYYMMDD from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

interface SealedMailProps {
  title: string;
  nickName: string;
  id: number;
  writtenDate: string;
}

export default function SealedMail({
  nickName,
  title,
  id,
  writtenDate,
}: SealedMailProps) {
  return (
    <Link
      href={`/openLetter/${id}`}
      className="relative mx-auto block h-[221px] w-[350px] selection:bg-none hover:opacity-70"
    >
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
        <section className="absolute h-full w-full" />
        <section className="absolute left-0 right-0 top-9 flex items-center justify-center">
          <div className="w-[210px] truncate text-center text-Body02-SB text-grey-900">
            {title}
          </div>
        </section>
        <footer className="absolute bottom-5 right-5 text-end">
          <section className="text-grey-900">
            <span className="">{"from. "}</span>
            <span className="text-Body02-M">{nickName}</span>
          </section>
          <section className="text-Caption text-grey-600">
            {formateISODateToYYYYMMDD(writtenDate)}
          </section>
        </footer>
      </section>
    </Link>
  );
}
