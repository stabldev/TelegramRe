import { createEffect, createSignal } from "solid-js";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatArea from "./chat-area";
import type { ChatMessage } from "~/types/chat";
import { useChat } from "~/context/chat";
import type { OnlineUser } from "~/types/user";
import SocketActions from "~/endpoints/socket/socket-actions";
import { scrollToBottom } from "~/functions/scroll-to-bottom";
import { destructure } from "@solid-primitives/destructure";

interface Props {
  messages: ChatMessage[];
}

const ChatView = (props: Props) => {
  const { messages: propsMsgs } = destructure(props);
  const { socket, activeRoom, setChatRooms, setOnlineUsers } = useChat();

  const [messages, setMessages] = createSignal(propsMsgs());

  socket()!.onmessage = function (e: MessageEvent) {
    const data: {
      action: "message" | "online_users" | "read_room" | "edit_message";
      message?: ChatMessage;
      online_users_list?: OnlineUser[];
    } = JSON.parse(e.data);

    if (data.action === SocketActions.MESSAGE) {
      if (data.message?.room === activeRoom()?.id) {
        setMessages((prevMessages) => [...(prevMessages || []), data.message!]);
      }
      setChatRooms((chatRooms) =>
        chatRooms?.map((room) =>
          room.id === data.message?.room
            ? {
                ...room,
                message: data.message,
                unreads: room.id !== activeRoom()?.id ? room.unreads + 1 : 0
              }
            : room
        )
      );
    } else if (data.action === SocketActions.ONLINE_USERS) {
      setOnlineUsers(data.online_users_list);
    } else if (data.action === SocketActions.READ_ROOM) {
      setChatRooms((chatRooms) =>
        chatRooms?.map((room) =>
          room.id === activeRoom()?.id ? { ...room, unreads: 0 } : room
        )
      );
    } else if (data.action === SocketActions.READ_MESSAGE) {
      console.log(data.message);
      if (data.message?.room !== activeRoom()?.id) {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === data.message?.id
              ? { ...message, is_read: true }
              : message
          )
        );
      }

      setChatRooms((chatRooms) =>
        chatRooms?.map((room) =>
          room.id === data.message?.room ? { ...room, unreads: 0 } : room
        )
      );
    } else if (data.action === SocketActions.EDIT_MESSAGE) {
      if (data.message?.room === activeRoom()?.id) {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === data.message?.id ? data.message : message
          )
        );
      }

      setChatRooms((chatRooms) =>
        chatRooms?.map((room) =>
          room.id === data.message?.room && room.message.id === data.message.id
            ? { ...room, message: data.message }
            : room
        )
      );
    }

    requestAnimationFrame(() => {
      scrollToBottom(chatAreaRef, { behavior: "smooth" });
    });
  };

  let chatAreaRef: HTMLDivElement;

  createEffect(() => {
    setMessages(propsMsgs());

    requestAnimationFrame(() => {
      scrollToBottom(chatAreaRef, { behavior: "smooth" });
    });
  });

  return (
    <div class="relative grid h-screen grid-rows-[min-content_1fr_min-content]">
      <ChatHeader />
      <ChatArea
        chat={messages()}
        ref={chatAreaRef!}
      />
      <ChatInput />
    </div>
  );
};

export default ChatView;
