import { For } from "solid-js";
import { groupChatBySender } from "~/functions/group-chat";
import ChatBubble from "./chat-bubble";
import { useAuth } from "~/context/auth";
import { ChatMessage } from "~/types/chat.types";
import { destructure } from "@solid-primitives/destructure";

interface Props {
    chat: ChatMessage[];
    ref: HTMLDivElement;
}

const ChatArea = (props: Props) => {
    const { user } = useAuth();
    const { ref, chat } = destructure(props);

    return (
        <>
            <div
                ref={ref()}
                class="relative px-5 md:w-[42.5rem] mx-auto flex flex-1 flex-col gap-3 overflow-y-scroll pt-10 [scrollbar-color:_rgba(255,255,255,0.1)_transparent] [scrollbar-width:none]"
            >
                <For each={groupChatBySender(chat())}>
                    {(group) => (
                        <div
                            class="flex flex-col gap-1.5"
                            classList={{
                                "items-end": group.sender === user()?.id
                            }}
                        >
                            <For each={group.chats}>
                                {(message, idx) => {
                                    const isFirstMsg =
                                        group.chats[idx() - 1]?.sender !==
                                        message.sender;
                                    const isLastMsg =
                                        group.chats[idx() + 1]?.sender !==
                                        message.sender;

                                    return (
                                        <ChatBubble
                                            message={message}
                                            self={
                                                message.sender ===
                                                user()?.id
                                            }
                                            firstMsg={isFirstMsg}
                                            lastMsg={isLastMsg}
                                        />
                                    );
                                }}
                            </For>
                        </div>
                    )}
                </For>
            </div>
        </>
    );
};

export default ChatArea;
