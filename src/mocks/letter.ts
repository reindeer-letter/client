import { Letter } from "@/types/letters";

export const makeLetter: (id: number) => Letter = (id) => ({
  bgmUrl: "null",
  category: "TEXT",
  createdAt: new Date().toISOString(),
  id,
  title: "null",
  updatedAt: new Date().toISOString(),
  description: "null",
  imageUrl: "null",
  isDelivered: false,
  isOpen: false,
  scheduledAt: `2024-12-${19 - Math.floor(Math.random() * 10)}T14:00:00.000Z`,
  senderNickName: "test",
});

export const makePaginatedLetters = (page: number, limit: number) => ({
  items: Array.from({ length: limit }, (_, i) =>
    makeLetter(i + 1 + (page - 1) * limit),
  ),
  meta: {
    totalPages: 5,
    total: 50,
    page,
    limit,
  },
});
