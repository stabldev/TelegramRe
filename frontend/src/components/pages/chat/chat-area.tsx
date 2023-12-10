import { component$ } from "@builder.io/qwik";
import { groupChatBySender } from "~/functions/group-chat";
import { Chat } from "~/types/components/chat";
import ChatBubble from "./chat-bubble";

interface Props {
  chat: Chat[];
}

export default component$<Props>((props) => {
  return (
    <div class="relative flex items-end">
      <div
        class="flex w-full flex-col gap-[0.5vw] overflow-y-scroll pb-[4.5vw] px-[1vw] pt-[5vw] [scrollbar-width:_thin] [scrollbar-color:_rgba(255,255,255,0.1)_transparent]"
        style={{ "max-height": "calc(100vh - 3.75vw)" }}
      >
        {
          groupChatBySender(props.chat).map((group, idx) => (
            <div
              key={idx}
              class={[
                "relative flex items-end gap-[0.65vw]",
                // TODO: this too dynamic
                { "self-end flex-row-reverse": group.sender.username === "tokitouq" }
              ]}
            >
              <img
                width={20}
                height={20}
                src={group.sender.image}
                alt="anya-forger"
                class="sticky bottom-0 w-[2.15vw] select-none rounded-full"
              />
              <div class="flex flex-col gap-[0.15vw]">
                {
                  group.chats.map((message, idx) => (
                    <ChatBubble
                      key={idx}
                      message={message}
                      // TODO: get username from backend
                      self={group.sender.username === "tokitouq"}
                      firstMessage={message.username !== group.chats[idx - 1]?.username && message.username === group.chats[idx + 1]?.username}
                      lastMessage={message.username !== group.chats[idx + 1]?.username && group.chats.length !== 1}
                      middleMessage={message.username === group.chats[idx - 1]?.username && message.username === group.chats[idx + 1]?.username}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
})
