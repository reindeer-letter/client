"use client";

import { CATEGORY, Category } from "@/constants/category";
import cn from "@/lib/cn";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryButtonProps {
  category: Category;
}

export default function CategoryButton({ category }: CategoryButtonProps) {
  const { key, value } = category;
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  return (
    <Link
      href={`/home?category=${key}`}
      className={cn(
        "flex h-10 w-[76px] items-center justify-center rounded-[62px] border-line-100 px-4 py-2 text-Body01-R text-grey-600 hover:opacity-70",
        currentCategory === key ||
          (!CATEGORY.some(({ key }) => key === currentCategory) &&
            key === "all")
          ? "border-[1.5px] border-line-900 text-Body01-B text-line-900"
          : "border border-line-100 text-grey-600",
      )}
    >
      {value}
    </Link>
  );
}
