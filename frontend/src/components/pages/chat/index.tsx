import { component$ } from "@builder.io/qwik";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";

export default component$(() => {
  return (
    <div class="relative grid grid-rows-[min-content_1fr]">
      <ChatHeader />
      <ChatInput />
    </div>
  )
})
