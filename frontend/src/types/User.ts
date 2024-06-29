export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  bio: string;
  color: string;
  is_verified: boolean;
  last_login: string;
  date_joined: string;
};

export type OnlineUser = {
  user: number;
};
