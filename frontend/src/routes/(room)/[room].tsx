import { Title } from "@solidjs/meta";
import {
  RouteDefinition,
  RouteSectionProps,
  cache,
  redirect
} from "@solidjs/router";
import { Intent } from "@solidjs/router/dist/types";
import { Show, createEffect, createSignal } from "solid-js";
import ChatArea from "~/components/pages/chat/ChatArea";
import ChatHeader from "~/components/pages/chat/ChatHeader";
import ChatInput from "~/components/pages/chat/ChatInput";
import ChatSidebar from "~/components/shared/chat/ChatSidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import { fetchAPI } from "~/functions/api/fetchApi";
import { formatChatRoom } from "~/functions/chat/formatRoom";
import DefaultLayout from "~/layouts/DefaultLayout";
import { ChatMessage, ChatRoom } from "~/types/Chat";
import { isDmChat } from "~/utils/typeGuards";

interface ChatRoomData {
  chat_room: ChatRoom;
  chat_messages: ChatMessage[];
}

const getRoom = cache(async (room: string, intent: Intent) => {
  try {
    let url: string;
    // check if solid-start fetch from server or browser
    if (intent === "initial") {
      // when on server
      url = "http://backend:8000/api/v1/chat/chat-rooms/" + room;
    } else {
      url = ApiEndpoints.chat.CHAT_ROOMS + room;
    }

    const data = (await fetchAPI(url)) as ChatRoomData;
    return data;
  } catch (err) {
    throw redirect("/");
  }
}, "room");

export const route = {
  load: (args) => {
    const room = args.params.room.slice(1);
    return getRoom(room, args.intent);
  },
  matchFilters: {
    room: (v: string) => v.includes("~")
  }
} satisfies RouteDefinition;

const UserChat = (props: RouteSectionProps) => {
  const { setChatStore } = useChat();
  const { showSidebar } = useShared();

  const [title, setTitle] = createSignal("Telegram");
  const [roomData, setRoomData] = createSignal<ChatRoomData>();

  const fetchRoomData = async (room: string, intent: Intent) => {
    const data = await getRoom(room, intent);
    setRoomData(data);
  };

  createEffect(() => {
    const room = props.params.room.slice(1);
    fetchRoomData(room, "navigate");
  });

  createEffect(() => {
    const data = roomData();
    if (data) {
      setChatStore("messages", data.chat_messages);

      const formatedChatRoom = (
        formatChatRoom([data.chat_room]) as ChatRoom[]
      )[0];

      setChatStore("activeRoom", formatedChatRoom);
      // check if room type is DM or group
      if (isDmChat(formatedChatRoom)) {
        setTitle(
          formatedChatRoom.members[0].full_name ??
            "~" + formatedChatRoom.members[0].username
        );
      } else {
        setTitle(data.chat_room.name as string);
      }
    }
  });

  return (
    <>
      <Title>{title()}</Title>
      <DefaultLayout>
        <div class="relative grid h-screen grid-rows-[min-content_1fr_min-content]">
          <ChatHeader />
          <ChatArea />
          <ChatInput />
        </div>
        <Show when={showSidebar()}>
          <ChatSidebar />
        </Show>
      </DefaultLayout>
    </>
  );
};

export default UserChat;
