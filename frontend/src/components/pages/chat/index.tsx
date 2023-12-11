import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { chat_mapping } from "~/data/mock/chats";
import { useLocation } from "@builder.io/qwik-city";
import { Chat } from "~/types/components/chat";
import ChatArea from "./chat-area";

export default component$(() => {
  const location = useLocation();
  const chat = useSignal<Chat[]>([]);
  const chatAreaRef = useSignal<HTMLDivElement>();

  const handleAddMessage = $((message: string) => {
    console.log(message);
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => location.url.href);
    const matched_chat = Object.entries(chat_mapping).find(([key]) => key === location.params.username.slice(1));
    if (matched_chat) chat.value = matched_chat[1];
    // TODO: convert this into a function
    requestAnimationFrame(() => {
      chatAreaRef.value?.scrollTo({
        top: chatAreaRef.value.scrollHeight,
        behavior: "auto"
      })
    })
  })

  return (
    <div class="relative grid grid-rows-[min-content_1fr]">
      <ChatHeader />
      <ChatArea chat={chat.value} ref={chatAreaRef} />
      <ChatInput onMessage$={handleAddMessage} />
    </div>
  )
})
