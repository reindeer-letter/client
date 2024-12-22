export type CategoryKey = "전체" | "글" | "목소리";
export type CategoryValue = "" | "TEXT" | "VOICE";

export interface Category {
  key: CategoryKey;
  value: CategoryValue;
}

export const CATEGORY: Category[] = [
  { key: "전체", value: "" },
  { key: "글", value: "TEXT" },
  { key: "목소리", value: "VOICE" },
];
