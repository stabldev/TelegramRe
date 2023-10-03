import { For, Show, createSignal } from "solid-js";
import { ChatBlock } from "./ChatBlock";
import { ChatType } from "../../data/mock/chat_messages";

export const ChatArea = (props: { chat: ChatType[] }) => {
	function groupChatBySender(chat: ChatType[]) {
		const groupedChat: {
			sender: {
				name: string;
				image: string;
			};
			chats: ChatType[]
		}[] = [];
		// store previous data for comparing with new
		let prevSender: {
			name: string;
			image: string;
		} | null = null;
		let prevChat: ChatType[] = [];

		chat.forEach((message) => {
			if (message.name === prevSender?.name) {
				prevChat.push(message);
			} else {
				if (prevSender !== null) {
					groupedChat.push({
						sender: {
							name: prevSender.name,
							image: prevSender.image
						},
						chats: prevChat
					});
				};

				prevSender = {
					name: message.name,
					image: message.image
				};
				prevChat = [message];
			};
		});

		if (prevSender !== null) {
			groupedChat.push({
				sender: prevSender,
				chats: prevChat
			});
		};

		return groupedChat;
	};

	return (
		<div
			class="relative bg-contain overflow-y-scroll [scrollbar-width:_thin] p-[1vw] flex flex-col gap-[0.5vw] justify-end"
			style={{"background-image": "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/pattern-20.svg)"}}
		>
			{/*dark overlay for background-image*/}
			<div class="absolute inset-0 bg-black/95 -z-[9999]"></div>

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
									{(message) => (
										<ChatBlock
											message={message}
											self={isSelf}
										/>
									)}
								</For>
							</div>
						</div>
					);
				}}
			</For>
		</div>
	);
};