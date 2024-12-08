import { CATEGORY } from "@/constants/category";
import Header from "@/components/header";
import MailScroll from "@/components/home/mailScroll";
import CategoryButton from "../../components/home/categoryButton";
import Footer from "../../components/home/footer";

export default function Page() {
  return (
    <>
      <Header />
      <div className="mt-[25px] text-center text-Title01-SB text-white">
        받은 편지함
      </div>
      <section className="mb-[28px] mt-6 flex gap-2">
        {CATEGORY.map((category) => (
          <CategoryButton key={category.key} category={category} />
        ))}
      </section>
      <MailScroll />
      <Footer />
    </>
  );
}
