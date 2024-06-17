import { For } from "solid-js";
import { groupChatBySender } from "~/functions/chat/group";
import ChatBubble from "./chat-bubble";
import { useAuth } from "~/context/auth";
import type { ChatMessage } from "~/types/chat";
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
				class="relative mx-auto flex flex-1 flex-col gap-3 overflow-y-scroll px-5 pt-10 [scrollbar-color:_rgba(255,255,255,0.1)_transparent] [scrollbar-width:none] md:w-[42.5rem]"
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
										group.chats[idx() - 1]?.sender !== message.sender;
									const isLastMsg =
										group.chats[idx() + 1]?.sender !== message.sender;

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
					)}
				</For>
			</div>
		</>
	);
};

export default ChatArea;
