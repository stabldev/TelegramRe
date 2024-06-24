import type { ChatMessage } from "./chat";
import type { OnlineUser } from "./user";

export type WebSocketData = {
  // TODO: add seperate type for "action"
  action: "online_message";
} & Partial<{
  message: ChatMessage;
  online_users_list: OnlineUser[];
}>;
