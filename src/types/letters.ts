export type Letter = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  isOpen: boolean;
  isDelivered: false;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  senderNickName: string;
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
