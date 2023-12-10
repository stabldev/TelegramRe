import { $, component$ } from "@builder.io/qwik";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";

export default component$(() => {
  const handleAddMessage = $((message: string) => {
    console.log(message);
  })

  return (
    <div class="relative grid grid-rows-[min-content_1fr]">
      <ChatHeader />
      <ChatInput onMessage={handleAddMessage} />
    </div>
  )
})
