import { CATEGORY as CATEGORIES, CategoryValue } from "@/constants/category";
import CategoryButton from "@/components/home/categoryButton";
import Footer from "@/components/myPage/footer";
import MailScroll from "@/components/home/mailScroll";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  searchParams: Promise<{ [key in "category"]: CategoryValue | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;
  return (
    <>
      <header className="relative px-5 pb-4 pt-14 text-Title01-SB text-line-700">
        <Link href="/myPage" className="absolute left-5 top-14">
          <Image
            src="/icons/arrow-left.png"
            alt="back"
            width={32}
            height={32}
            priority
          />
        </Link>
        <div className="text-center">내게 쓴 편지</div>
      </header>
      <section className="flex gap-2 px-5 py-3">
        {CATEGORIES.map((categoryItem) => (
          <Link
            href={`/myPage/letterToMe?category=${categoryItem.value}`}
            key={categoryItem.key}
          >
            <CategoryButton
              key={categoryItem.key}
              category={categoryItem}
              currentCategory={category}
            />
          </Link>
        ))}
      </section>
      <MailScroll route={`/letters/my/self?category=${category || ""}`} />
      <Footer />
    </>
  );
}
