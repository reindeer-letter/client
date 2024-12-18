import Image from "next/image";
import Link from "next/link";
import { formateISODateToYYYYMMDDHHMM } from "../../utils/formatDate";

interface MailProps {
  id: number;
  title: string;
  nickName: string;
  writtenDate: string;
}

export default function Mail({ id, nickName, title, writtenDate }: MailProps) {
  return (
    <Link
      href={`/openLetter/${id}`}
      className="relative mx-auto block h-[221px] w-[350px] selection:bg-none hover:opacity-90"
    >
      <Image src="/images/read-letter.png" alt="Mail" priority fill />
      <section className="absolute h-full w-full" />
      <section className="absolute h-full w-full">
        <section className="absolute left-0 right-0 top-9 flex items-center justify-center">
          <div className="w-[210px] truncate text-center text-Body01-M text-grey-900">
            {title}
          </div>
        </section>
        <footer className="absolute bottom-3 left-0 right-0 text-center text-Body02-M text-line-700">
          <section>TO. {nickName}</section>
          <section>{formateISODateToYYYYMMDDHHMM(writtenDate)}</section>
        </footer>
      </section>
    </Link>
  );
}
