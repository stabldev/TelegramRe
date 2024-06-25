import { createStore } from "solid-js/store";
import { ChatRoom } from "~/types/chat";

export const [chatRooms, setChatRooms] = createStore<ChatRoom[]>([]);
export const [activeRoom, setActiveRoom] = createStore<ChatRoom>(
  {} as ChatRoom
);
