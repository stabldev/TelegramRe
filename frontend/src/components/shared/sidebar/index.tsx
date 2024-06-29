import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal
} from "solid-js";
import { formatChatRoom } from "~/functions/chat/formatRoom";
import type { ChatRoom } from "~/types/Chat";
import type { OnlineUser } from "~/types/User";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import ChatBar from "./ChatBar";
import SettingsBar from "./SettingsBar";
import { useChat } from "~/context/chat";

async function getChatRooms() {
  const res = await fetch(ApiEndpoints.chat.CHAT_ROOMS, {
    credentials: "include"
  });
  const data = (await res.json()) as ChatRoom[];
  return data;
}

async function getOnlineUsers() {
  const res = await fetch(ApiEndpoints.chat.ONLINE_USERS, {
    credentials: "include"
  });
  const data = (await res.json()) as OnlineUser[];
  return data;
}

const Sidebar: Component = () => {
  const { setChatStore } = useChat();

  const [data] = createResource<ChatRoom[]>(getChatRooms);
  const [onlineUsersData] = createResource<OnlineUser[]>(getOnlineUsers);
  const [isChatBarOpen, setIsChatBarOpen] = createSignal(true);

  const toggleView = () => setIsChatBarOpen((prev) => !prev);

  createEffect(() => {
    const formatedRoom = formatChatRoom(data());
    if (formatedRoom) {
      setChatStore("chatRooms", formatedRoom);
    }
    setChatStore("onlineUsers", onlineUsersData() ?? []);
  });

  return (
    <div class="group relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-neutral-300 bg-base-200">
      <Show
        when={isChatBarOpen()}
        fallback={<SettingsBar toggleView={toggleView} />}
      >
        <ChatBar
          isLoading={data.loading}
          toggleView={toggleView}
        />
      </Show>
    </div>
  );
};

export default Sidebar;
