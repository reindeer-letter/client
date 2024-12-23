export type PostAuthLoginResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    nickName: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    refreshToken: string;
  };
};
