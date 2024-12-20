import { CATEGORY as CATEGORIES, CategoryValue } from "@/constants/category";
import CategoryButton from "@/components/home/categoryButton";
import UncompletedMailScroll from "@/components/myPage/uncompletedMailScroll";
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
        <div className="text-center">작성 중인 편지</div>
      </header>
      <section className="flex gap-2 px-5 py-3">
        {CATEGORIES.map((categoryItem) => (
          <Link
            href={`/myPage/uncompletedLetter?category=${categoryItem.value}`}
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
      <UncompletedMailScroll
        route={`/letters/drafts/paginated?category=${category || ""}`}
      />
    </>
  );
}
