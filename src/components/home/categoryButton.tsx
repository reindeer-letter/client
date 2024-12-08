"use client";

import { CATEGORY, Category } from "@/constants/category";
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
      className={`flex items-center justify-center rounded-[74px] px-3 py-1 text-Body01-R hover:opacity-70 ${currentCategory === key || (!CATEGORY.some(({ key }) => key === currentCategory) && key === "all") ? "bg-white text-Body01-B text-grey-900" : "border border-grey-700 text-white"}`}
    >
      {value}
    </Link>
  );
}
