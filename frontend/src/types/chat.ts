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

type BaseChatRoom = {
  id: number;
  type: string;
  name: string | null;
  bio: string | null;
  unreads: number;
  message: ChatMessage;
  avatar: string | null;
  is_verified: boolean;
};

export type GroupChatRoom = BaseChatRoom & {
  type: "GROUP";
  members: number[];
}

export type DMChatRoom = BaseChatRoom & {
  type: "DM";
  members: ChatMember[];
}

// Union type
export type ChatRoom = GroupChatRoom | BaseChatRoom;
