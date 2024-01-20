import { For, Show } from "solid-js";
import { groupChatBySender } from "~/functions/group-chat";
import { ChatProps } from "~/types/chat";
import { ChatBubble } from "./chat-bubble";
import { useAuth } from "~/context/auth";
import { ChatSidebar } from "./chat-sidebar";
import { useShared } from "~/context/shared";
import { Transition } from "solid-transition-group";

interface Props {
	chat: ChatProps[];
	ref: HTMLDivElement;
}

export const ChatArea = (props: Props) => {
	const { user } = useAuth();
	const { showSidebar } = useShared();

	return (
		<div class="relative flex">
			<div
				ref={props.ref}
				class="mx-auto flex w-full flex-col gap-2 self-end overflow-y-scroll px-2 pb-14 pt-10 [scrollbar-color:_rgba(255,255,255,0.1)_transparent] [scrollbar-width:_thin] md:w-[43rem] md:min-w-[43rem]"
				style={{ "max-height": "calc(100vh - 3rem)" }}
			>
				<For each={groupChatBySender(props.chat)}>
					{(group) => (
						<div
							class="relative flex items-end gap-2"
							classList={{ "self-end flex-row-reverse": group.sender.username === "tokitouq" }}
						>
							<img
								hidden
								src={group.sender.image}
								alt="anya-forger"
								class="sticky bottom-0 size-4 select-none rounded-full"
							/>
							<div
								class="flex flex-col gap-0.5"
								classList={{ "items-end": group.sender.username === "tokitouq" }}
							>
								<For each={group.chats}>
									{(message, i) => (
										<ChatBubble
											message={message}
											self={group.sender.username === "tokitouq"}
										/>
									)}
								</For>
							</div>
						</div>
					)}
				</For>
			</div>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ width: 0 }, { width: "25vw" }], {
						duration: 200,
						easing: "ease-in-out"
					});
					a.finished.then(done);
				}}
				onExit={(el, done) => {
					const a = el.animate([{ width: "25vw" }, { width: 0 }], {
						duration: 200,
						easing: "ease-in-out"
					});
					a.finished.then(done);
				}}
			>
				<Show when={showSidebar()}>
					<ChatSidebar />
				</Show>
			</Transition>
		</div>
	);
};
