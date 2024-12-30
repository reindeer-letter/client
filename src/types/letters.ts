export type Letter = {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  isOpen: boolean;
  isDelivered: boolean;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  senderNickname: string;
  receiver: {
    id: number;
    email: string;
    nickName: string;
    profileUrl: string;
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

export interface PostLettersRequest {
  title: string;
  description: string;
  imageUrls: string[];
  bgmUrl: string;
  category: "TEXT" | "VOICE";
  receiverId: number;
  isOpen: false;
  scheduledAt: string;
  senderNickName: string;
  audioUrl?: string;
}

export interface PostLettersDraftRequest {
  title: string;
  description: string;
  imageUrls: [];
  bgmUrl: string;
  category: "TEXT";
  receiverId: number;
  scheduledAt: string;
  senderNickName: string;
}

export interface PutLettersDraftIdRequest {
  title: string;
  description: string;
  imageUrls: [];
  bgmUrl: string;
  category: "TEXT";
  receiverId: number;
  scheduledAt: string;
  senderNickName: string;
}

export interface PostLettersDraftResponse {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  bgmUrl: string;
  category: "TEXT";
  isOpen: boolean;
  isDelivered: boolean;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  senderNickname: string;
  isDraft: boolean;
  draftData: {
    title: string;
    description: string;
    imageUrls: string[];
    bgmUrl: string;
    category: "TEXT";
    receiverId: number;
    scheduledAt: string;
    senderNickName: string;
  };
}

export interface GetLettersDraftsPaginatedResponse {
  items: {
    id: number;
    title: string;
    description: string;
    imageUrls: string[];
    bgmUrl: string;
    category: "TEXT";
    draftData: {
      title: string;
      description: string;
      imageUrls: string[];
      bgmUrl: string;
      category: "TEXT";
      receiverId: number;
      scheduledAt: string;
      senderNickname: string;
    };
    createdAt: string;
    updatedAt: string;
    senderNickname: string;
    receiverId: number;
    receiverNickName: string;
  }[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
