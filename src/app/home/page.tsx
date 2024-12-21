import { CATEGORY as CATEGORIES, CategoryValue } from "@/constants/category";
import Header from "@/components/header";
import Link from "next/link";
import MailScroll from "@/components/home/mailScroll";
import CategoryButton from "../../components/home/categoryButton";
import Footer from "../../components/home/footer";

interface PageProps {
  searchParams: Promise<{ [key in "category"]: CategoryValue | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;
  return (
    <>
      <Header />
      <div className="mt-[16px] px-5 pb-2 text-Head text-grey-900">
        받은 편지함
      </div>
      <section className="flex gap-2 px-5 py-3">
        {CATEGORIES.map((categoryItem) => (
          <Link
            href={`/home?category=${categoryItem.value}`}
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
      <MailScroll route={`/letters/my?category=${category || ""}`} />
      <Footer />
    </>
  );
}
