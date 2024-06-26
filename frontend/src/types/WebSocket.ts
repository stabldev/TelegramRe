import type { ChatMessage } from "./chat";
import type { OnlineUser } from "./user";

type WebSocketActions =
  | "online_users"
  | "message"
  | "edit_message"
  | "read_room"
  | "read_message";

export type WebSocketData = {
  action: WebSocketActions;
} & Partial<{
  message: ChatMessage;
  online_users_list: OnlineUser[];
}>;
