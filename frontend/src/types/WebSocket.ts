import type { ChatMessage } from "./chat";
import type { OnlineUser } from "./user";

type DataActions =
  | "online_users"
  | "message"
  | "edit_message"
  | "read_room"
  | "read_message";

export type WebSocketData = {
  // TODO: add seperate type for "action"
  action: DataActions;
} & Partial<{
  message: ChatMessage;
  online_users_list: OnlineUser[];
}>;
