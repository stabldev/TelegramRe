import { For } from "solid-js";
import { groupChatBySender } from "~/functions/group-chat";
import { ChatBubble } from "./chat-bubble";
import { useAuth } from "~/context/auth";
import { ChatMessage } from "~/types/chat.types";
import { destructure } from "@solid-primitives/destructure";

interface Props {
	chat: ChatMessage[];
	ref: HTMLDivElement;
}

export const ChatArea = (props: Props) => {
	const { user } = useAuth();
	const { ref, chat } = destructure(props);

	return (
		<>
			<div
				ref={ref()}
				class="relative mx-auto flex h-full w-full flex-col gap-2 overflow-y-scroll px-2 pt-10 [scrollbar-color:_rgba(255,255,255,0.1)_transparent] [scrollbar-width:none] md:w-[43rem] md:min-w-[43rem]"
			>
				<For each={groupChatBySender(chat())}>
					{(group) => (
						<div
							class="relative flex items-end gap-2"
							classList={{ "self-end flex-row-reverse": group.sender === user()?.id }}
						>
							<div
								class="flex flex-col gap-0.5"
								classList={{ "items-end": group.sender === user()?.id }}
							>
								<For each={group.chats}>
									{(message, idx) => {
										let isFirstMsg = group.chats[idx() - 1]?.sender !== message.sender;
										let isLastMsg = group.chats[idx() + 1]?.sender !== message.sender;

										return (
											<ChatBubble
												message={message}
												self={message.sender === user()?.id}
												firstMsg={isFirstMsg}
												lastMsg={isLastMsg}
											/>
										);
									}}
								</For>
							</div>
						</div>
					)}
				</For>
			</div>
		</>
	);
};
