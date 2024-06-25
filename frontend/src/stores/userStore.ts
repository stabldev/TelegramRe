import { createStore } from "solid-js/store";
import { OnlineUser } from "~/types/user";

export const [onlineUsers, setOnlineUsers] = createStore<OnlineUser[]>([]);
