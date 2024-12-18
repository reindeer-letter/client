type CategoryKey = "all" | "letter" | "voice";
type CategoryValue = "전체" | "글" | "목소리";

export interface Category {
  key: CategoryKey;
  value: CategoryValue;
}

export const CATEGORY: Category[] = [
  { key: "all", value: "전체" },
  { key: "letter", value: "글" },
  { key: "voice", value: "목소리" },
];
