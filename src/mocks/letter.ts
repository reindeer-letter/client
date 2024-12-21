import { Letter } from "@/types/letters";

export const makeLetter: (id: number, category: "TEXT" | "VOICE") => Letter = (
  id,
  category,
) => {
  const scheduledAt = new Date();
  scheduledAt.setDate(
    scheduledAt.getDate() + 5 - Math.floor(Math.random() * 10),
  );
  return {
    bgmUrl: "null",
    category,
    createdAt: new Date().toISOString(),
    id,
    title: "null",
    updatedAt: new Date().toISOString(),
    description: "null",
    imageUrl: "null",
    isDelivered: scheduledAt < new Date(),
    isOpen: false,
    scheduledAt: scheduledAt.toISOString(),
    senderNickName: "test",
  };
};

export const makePaginatedLetters = (
  page: number,
  limit: number,
  category: "TEXT" | "VOICE",
) => ({
  items: Array.from({ length: limit }, (_, i) =>
    makeLetter(i + 1 + (page - 1) * limit, category),
  ),
  meta: {
    totalPages: 5,
    total: 50,
    page,
    limit,
  },
});
