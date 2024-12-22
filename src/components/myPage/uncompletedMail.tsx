import Image from "next/image";
import Link from "next/link";
import { formateISODateToYYYYMMDDHHMM } from "../../utils/formatDate";

interface UncompletedMailProps {
  id: number;
  title: string;
  nickName: string;
  writtenDate: string;
  description: string;
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  imageUrl: string;
}

// TODO: 임시저장 로직 구현, 관련 정보를 전역 상태에 담고 이동
/* eslint-disable */
export default function UncompletedMail({
  id,
  nickName,
  title,
  writtenDate,
  description,
  bgmUrl,
  category,
  imageUrl,
}: UncompletedMailProps) {
  return (
    <Link
      href={`/writingLetter/${id}`}
      className="relative mx-auto block h-[221px] w-[350px] selection:bg-none hover:opacity-70"
    >
      <Image src="/images/letter.png" alt="Mail" priority fill />
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
