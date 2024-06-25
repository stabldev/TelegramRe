import { createEffect, createSignal } from "solid-js";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatArea from "./chat-area";
import type { ChatMessage } from "~/types/chat";
import { scrollToBottom } from "~/functions/scroll-to-bottom";
import { destructure } from "@solid-primitives/destructure";

interface Props {
  messages: ChatMessage[];
}

const ChatView = (props: Props) => {
  const { messages: propsMsgs } = destructure(props);

  const [messages, setMessages] = createSignal(propsMsgs());
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
