import { component$ } from "@builder.io/qwik";
import ChatHeader from "./chat-header";

export default component$(() => {
  return (
    <div class="relative grid grid-rows-[min-content_1fr]">
      <ChatHeader />
    </div>
  )
})
