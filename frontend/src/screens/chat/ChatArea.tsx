import { For, Show, createEffect, createSignal } from "solid-js";
import { groupChatBySender } from "../../functions/group_chat";
import { ChatProps } from "../../types/Chat";
import { ChatBlock } from "../../components/chat/ChatBlock";
import Arrow from "../../assets/icons/Arrow";
import { scrollToBottom } from "../../functions/scroll_to_bottom";

interface Props {
	chat: ChatProps[];
	ref: HTMLDivElement;
};

export const ChatArea = (props: Props) => {
	const [showScrollBtn, setShowScrollBtn] = createSignal(false);

	const handleScroll = (e: UIEvent) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
		setShowScrollBtn(Math.abs(scrollHeight - clientHeight - scrollTop) < 1);
	};

	function scrollChatArea(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;
		const chatAreaEl = target.parentElement?.previousElementSibling as HTMLDivElement;

		scrollToBottom(chatAreaEl, true);
	};

	return (
		<div class="relative flex items-end">
			<div
				ref={props.ref}
				class="pl-[1vw] pt-[5vw] pb-[1vw] flex flex-col gap-[0.5vw] w-full overflow-y-scroll [scrollbar-width:_thin] [scrollbar-color:_rgba(255,255,255,0.1)_transparent]"
				style={{"max-height": "calc(100vh - 7.5vw)"}}
				onScroll={handleScroll}
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
			<button
				hidden={showScrollBtn()}
				class="absolute right-[1vw] bottom-[1vw] p-[0.5vw] rounded-full bg-stone-800"
				onClick={scrollChatArea}
			>
				<Arrow
					variant="down"
					class="text-white/50 text-[2vw]"
				/>
			</button>
		</div>
	);
};