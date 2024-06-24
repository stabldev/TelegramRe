import { ChatMessage } from "./chat";
import { OnlineUser } from "./user";

export type SocketData = {
  // TODO: add seperate type for "action"
  action: "online_message";
  message?: ChatMessage;
  online_users_list?: OnlineUser[];
};
