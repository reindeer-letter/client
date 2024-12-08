type Letter = {
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
  userId: number | null;
  receiverId: number;
  receiver: {
    id: number;
    email: string;
    password: string;
    nickName: string;
    profileImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
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
