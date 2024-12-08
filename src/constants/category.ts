type CategoryKey = "all" | "letter" | "voice";
type CategoryValue = "전체" | "글 편지" | "목소리 편지";

export interface Category {
  key: CategoryKey;
  value: CategoryValue;
}

export const CATEGORY: Category[] = [
  { key: "all", value: "전체" },
  { key: "letter", value: "글 편지" },
  { key: "voice", value: "목소리 편지" },
];
