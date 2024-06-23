import { Title } from "@solidjs/meta";
import {
  RouteDefinition,
  RouteSectionProps,
  cache,
  redirect
} from "@solidjs/router";
import { Intent } from "@solidjs/router/dist/types";
import { Show, createEffect, createSignal } from "solid-js";
import ChatView from "~/components/pages/chat";
import ChatSidebar from "~/components/shared/chat/chat-sidebar";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import { fetchAPI } from "~/functions/api/fetch";
import { formatChatRoom } from "~/functions/chat/format-room";
import DefaultLayout from "~/layouts/default";
import { ChatMessage, ChatRoom } from "~/types/chat";
import { isDmChat } from "~/utils/type-guards";

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
  const { setActiveRoom } = useChat();
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
      const formatedChatRoom = (
        formatChatRoom([data.chat_room]) as ChatRoom[]
      )[0];
      setActiveRoom(formatedChatRoom);
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
        <ChatView messages={roomData()?.chat_messages as ChatMessage[]} />
        <Show when={showSidebar()}>
          <ChatSidebar />
        </Show>
      </DefaultLayout>
    </>
  );
};

export default UserChat;
