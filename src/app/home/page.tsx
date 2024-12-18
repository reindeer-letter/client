import { CATEGORY } from "@/constants/category";
import Header from "@/components/header";
import MailScroll from "@/components/home/mailScroll";
import CategoryButton from "../../components/home/categoryButton";
import Footer from "../../components/home/footer";

export default function Page() {
  return (
    <>
      <Header />
      <div className="mt-[16px] px-5 pb-2 text-Head text-grey-900">
        받은 편지함
      </div>
      <section className="flex gap-2 px-5 py-3">
        {CATEGORY.map((category) => (
          <CategoryButton key={category.key} category={category} />
        ))}
      </section>
      <MailScroll />
      <Footer />
    </>
  );
}
