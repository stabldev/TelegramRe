import { WS_URL } from "~/config";

export const wsEndpoints = {
  CHAT: WS_URL + "/ws/v1/chat/"
};

export const wsDataActions = {
  MESSAGE: "message",
  ONLINE_USERS: "online_users",
  READ_ROOM: "read_room",
  READ_MESSAGE: "read_message",
  EDIT_MESSAGE: "edit_message"
};
