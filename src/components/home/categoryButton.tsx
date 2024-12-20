"use client";

import { CATEGORY, Category, CategoryValue } from "@/constants/category";
import cn from "@/lib/cn";

interface CategoryButtonProps {
  category: Category;
  currentCategory?: CategoryValue;
}

export default function CategoryButton({
  category,
  currentCategory = "",
}: CategoryButtonProps) {
  const { key, value } = category;
  return (
    <section
      className={cn(
        "flex h-10 w-[76px] items-center justify-center rounded-[62px] border-line-100 px-4 py-2 text-Body01-R text-grey-600 hover:opacity-70",
        currentCategory === value ||
          (!CATEGORY.some(({ value }) => value === currentCategory) &&
            value === "")
          ? "border-[1.5px] border-line-900 text-Body01-B text-line-900"
          : "border border-line-100 text-grey-600",
      )}
    >
      {key}
    </section>
  );
}
