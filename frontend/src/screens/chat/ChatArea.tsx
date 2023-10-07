import { For, Show, createEffect, createSignal } from "solid-js";
import { groupChatBySender } from "../../functions/group_chat";
import { ChatProps } from "../../types/Chat";
import { ChatBlock } from "../../components/chat/ChatBlock";

interface Props {
	chat: ChatProps[];
	ref: HTMLDivElement;
};

export const ChatArea = (props: Props) => {
	return (
		<div class="relative flex items-end">
			<div
				ref={props.ref}
				class="pl-[1vw] pt-[5vw] pb-[4.5vw] flex flex-col gap-[0.5vw] w-full overflow-y-scroll [scrollbar-width:_thin] [scrollbar-color:_rgba(255,255,255,0.1)_transparent]"
				style={{"max-height": "calc(100vh - 3.75vw)"}}
			>
				<For each={groupChatBySender(props.chat)}>
					{(group) => {
						// hardcoded "tokito" value ( will will be refactored )
						const isSelf = group.sender.name === "tokito";

						return (
							<div class="relative flex items-end gap-[0.65vw]">
								<img
									src={group.sender.image}
									alt="anya-forger"
									class="sticky bottom-0 w-[2.15vw] rounded-full select-none"
								/>
								<div class="flex flex-col gap-[0.15vw]">
									<For each={group.chats}>
										{(message, i) => (
											<ChatBlock
												message={message}
												self={isSelf}
												lastMessage={message.name !== group.chats[i() + 1]?.name && group.chats.length !== 1}
												middleMessage={message.name === group.chats[i() - 1]?.name && message.name === group.chats[i() + 1]?.name}
											/>
										)}
									</For>
								</div>
							</div>
						);
					}}
				</For>
			</div>
		</div>
	);
};