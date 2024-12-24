export interface openLetters {
  senderNickname: string;
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  bgmUrl: string;
  audioUrl: string;
  senderNickName: string;
  category: string;
  isOpen: boolean;
  isDeliverd: boolean;
  scheduleAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  receiverId: string;
  receiver: {
    id: string;
    nickName: string;
    password: string;
    email: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}
