export type ChatMessage = {
  id: number;
  type: "text" | "image" | "gif";
  room: number;
  sender: ChatMember;
  content: string;
  file: string | null;
  is_read: boolean;
  edited: boolean;
  created_at: string;
};

export type ChatMember = {
  id: number;
  username: string;
  full_name: string;
  is_verified: boolean;
  avatar: string;
  bio: string;
};

export type ChatRoom = {
  id: number;
  type: string;
  name: string | null;
  unreads: number;
  message: ChatMessage;
  members: ChatMember[];
  avatar: string | null;
  is_verified: boolean;
};
