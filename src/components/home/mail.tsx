import formateISODateToYYYYMMDD from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

interface SealedMailProps {
  title: string;
  nickName: string;
  isOpen: boolean;
  id: number;
  scheduledAt: string | null;
}

export default function Mail({
  nickName,
  title,
  isOpen,
  id,
  scheduledAt,
}: SealedMailProps) {
  return (
    <Link
      href={`/openLetter/${id}`}
      className="relative mx-auto block h-[221px] w-[350px] selection:bg-none hover:opacity-70"
    >
      <Image
        src={isOpen ? "/images/letter.png" : "/images/sealed-letter.png"}
        alt="Mail"
        priority
        sizes="350px"
        fill
      />
      <section className="absolute h-full w-full">
        <section className="absolute left-0 right-0 top-9 flex items-center justify-center">
          <div className="w-[210px] truncate text-center text-Body01-M text-grey-900">
            {title}
          </div>
        </section>
        <footer className="absolute bottom-5 right-5 text-end font-handwriting text-Title01-R text-line-700">
          <section>
            {scheduledAt && formateISODateToYYYYMMDD(scheduledAt)}
          </section>
          <section>{nickName} 보냄</section>
        </footer>
      </section>
    </Link>
  );
}
