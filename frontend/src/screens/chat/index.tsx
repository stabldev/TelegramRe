import { Component, createEffect, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { ChatArea } from "./ChatArea";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { chat_mapping } from "../../data/mock/chat_messages";
import { ChatProps } from "../../types/Chat";
import { scrollToBottom } from "../../functions/scroll_to_bottom";

export const ChatScreen: Component = () => {
  const params = useParams<{ username: string }>();
  const [chat, setChat] = createSignal<ChatProps[]>([]);

  let chatAreaRef: HTMLDivElement;

  const handleAddMessage = (e: CustomEvent) => {
    const message = e.detail;

    const newChat: ChatProps = {
      id: Math.floor(Math.random() * 10000),
      name: "tokito",
      image: "https://avatars.githubusercontent.com/u/114811070?v=4",
      content: message,
      time: new Date().toISOString(),
      status: "sending"
    };

    setChat((prev) => [...prev, newChat]);
    // scroll chat area to bottom
    requestAnimationFrame(() => {
      scrollToBottom(chatAreaRef, { behavior: "instant" });
    });
  };

  createEffect(() => {
    const matchedChat = Object.entries(chat_mapping).find(
      ([key]) => key === params.username.slice(1)
    );
    if (matchedChat) setChat(matchedChat[1]);

    // scroll chat area to bottom
    requestAnimationFrame(() => {
      scrollToBottom(chatAreaRef, { behavior: "instant" });
    });
  }, );

  return (
    <div class="relative grid grid-rows-[min-content_1fr]">
      <ChatHeader />
      <ChatArea
        chat={chat()}
        ref={chatAreaRef!}
      />
      <ChatInput onMessage={handleAddMessage} />
    </div>
  );
};

export default ChatScreen;
