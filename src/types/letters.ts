export type Letter = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  isOpen: boolean;
  isDelivered: boolean;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  senderNickname: string;
};

export interface GetLettersMyLettersResponse {
  items: Letter[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
