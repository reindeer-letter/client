import { GetLettersDraftsPaginatedResponse, Letter } from "@/types/letters";

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
    imageUrls: [],
    isDelivered: scheduledAt < new Date(),
    isOpen: Math.random() > 0.5,
    scheduledAt: scheduledAt.toISOString().split("T")[0],
    senderNickname: "test",
    receiver: {
      email: "",
      id: 1,
      nickName: "test",
      profileUrl: "null",
    },
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

export const makePaginatedLettersWithDifferentCategory = (
  page: number,
  limit: number,
) => ({
  items: Array.from({ length: limit }, (_, i) => {
    const newLetter = makeLetter(
      i + 1 + (page - 1) * limit,
      i % 2 === 0 ? "TEXT" : "VOICE",
    );
    newLetter.scheduledAt = null;
    return newLetter;
  }),
  meta: {
    totalPages: 5,
    total: 50,
    page,
    limit,
  },
});

export const makeDraft: (
  id: number,
) => GetLettersDraftsPaginatedResponse["items"][0] = (id) => {
  const scheduledAt = new Date();
  scheduledAt.setDate(
    scheduledAt.getDate() + 5 - Math.floor(Math.random() * 10),
  );
  return {
    draftData: {
      bgmUrl: "null",
      category: "TEXT",
      createdAt: new Date().toISOString(),
      id,
      title: "새 편지",
      updatedAt: new Date().toISOString(),
      description: "null",
      imageUrls: [],
      receiverId: 1,
      isOpen: false,
      scheduledAt: scheduledAt.toISOString().split("T")[0],
      senderNickname: "test",
    },
    category: "TEXT",
    bgmUrl: "null",
    receiverId: 1,
    createdAt: new Date().toISOString(),
    id,
    title: "null",
    updatedAt: new Date().toISOString(),
    description: "null",
    imageUrls: [],
    isDelivered: scheduledAt < new Date(),
    isOpen: false,
    scheduledAt: scheduledAt.toISOString().split("T")[0],
    senderNickname: "test",
  };
};

export const makePaginatedDrafts = (page: number, limit: number) => ({
  items: Array.from({ length: limit }, (_, i) =>
    makeDraft(i + 1 + (page - 1) * limit),
  ),
  meta: {
    totalPages: 5,
    total: 50,
    page,
    limit,
  },
});
