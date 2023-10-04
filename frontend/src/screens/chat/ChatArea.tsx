import { For, Show, createSignal } from "solid-js";
import { ChatBlock } from "./ChatBlock";
import { groupChatBySender } from "../../functions/group_chat";
import { ChatProps } from "../../types/Chat";

export const ChatArea = (props: { chat: ChatProps[] }) => {
	return (
		<div
			class="relative bg-contain flex items-end"
			style={{"background-image": "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-20.svg)"}}
		>
			{/*dark overlay for background-image*/}
			<div class="absolute inset-0 bg-black/95 -z-[9999]"></div>

			<div
				class="pl-[1vw] pt-[5vw] pb-[1vw] flex flex-col gap-[0.5vw] w-full overflow-y-scroll [scrollbar-width:_thin] [scrollbar-color:_rgba(255,255,255,0.15)_transparent]"
				style={{"max-height": "calc(100vh - 7.5vw)"}}
			>
				<For each={groupChatBySender(props.chat)}>
					{(group) => {
						// hardcoded "tokito" value ( will will be refactored )
						const isSelf = group.sender.name === "tokito";

						return (
							<div class="flex items-end gap-[0.65vw]">
								<img
									src={group.sender.image}
									alt="anya-forger"
									class="w-[2.15vw] rounded-full select-none"
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