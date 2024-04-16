import { Show, createEffect, createSignal } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { useChat } from "~/context/chat";
import { ChatContextMenu } from "~/components/shared/popups/chat-context-menu";
import { Portal } from "solid-js/web";

interface Props {
	message: ChatMessage;
	self: boolean;
	firstMsg: boolean;
	lastMsg: boolean;
}

export const ChatBubble = (props: Props) => {
	const { socket, activeRoom } = useChat();
	const [showContextMenu, setShowContextMenu] = createSignal(false);
	const [contextPos, setContextPos] = createSignal({ x: 0, y: 0 });

	const { message, self, firstMsg, lastMsg } = destructure(props);
	const formatedDate = new FormatDate(message().timestamp)
		.format_to_relative_time;

	let el: HTMLDivElement;
	const useVisibilityObserver = createVisibilityObserver({ threshold: 1 });
	const visible = useVisibilityObserver(() => el);

	createEffect(() => {
		visible() &&
			!self() &&
			!message().is_read &&
			handleReadMessage(message().id);
	});

	async function handleReadMessage(id: number) {
		message().is_read = true;
		// send socket action
		socket()!.send(
			JSON.stringify({
				action: "read_message",
				message_id: id,
				room_id: activeRoom()?.room_id
			})
		);
	}

	const handleContextMenu = (e: any) => {
		e.preventDefault();
		setContextPos({
			x: e.x,
			y: e.y
		});
		setShowContextMenu(true);
	};

	return (
		<>
			<Show when={showContextMenu()}>
				<Portal>
					<ChatContextMenu
						x={contextPos().x}
						y={contextPos().y}
						self={self}
						message={message}
						onClose={() => setShowContextMenu(false)}
					/>
				</Portal>
			</Show>
			<div
				ref={(ref) => {
					el = ref;
				}}
				onContextMenu={handleContextMenu}
				class="relative flex w-max max-w-md flex-col gap-1 overflow-hidden rounded-2xl px-2.5 py-1 text-accent"
				classList={{
					"bg-primary rounded-r": self(),
					"bg-base-200 rounded-l": !self(),
					"!p-0 !max-w-60": message().type === "image",
					"!p-0 overflow-visible bg-transparent":
						message().type === "gif",
					"rounded-tr-2xl": self() && firstMsg(),
					"rounded-br-2xl": self() && lastMsg(),
					"rounded-tl-2xl": !self() && firstMsg(),
					"rounded-bl-2xl": !self() && lastMsg()
				}}
			>
				<Show
					when={message().type == "image" || message().type === "gif"}
				>
					<img
						src={message().file!}
						alt="Image"
						loading="lazy"
						class="cursor-pointer"
						classList={{
							"rounded-lg": message().type === "gif"
						}}
					/>
				</Show>
				<Show when={message().type === "gif"}>
					<span class="absolute left-0 top-0 m-1 w-max rounded-md bg-base-300/50 p-1 text-xs text-accent/80">
						GIF
					</span>
				</Show>
				<div
					class="flex w-full gap-1"
					classList={{
						"px-2.5 pb-1": message().type === "image",
						"absolute bottom-0 right-0 p-1 bg-base-300/50 w-max rounded-md m-1":
							message().type === "gif"
					}}
				>
					<span class="whitespace-pre-line text-base leading-snug text-accent">
						{message().content}
					</span>
					<Show when={message().edited}>
						<span class="ml-auto select-none self-end text-[0.7rem] italic leading-none text-accent/80">
							edited
						</span>
					</Show>
					<span
						classList={{
							"ml-auto": !message().edited
						}}
						class="select-none self-end text-xs uppercase leading-none text-accent/50"
					>
						{formatedDate}
					</span>
					<Show when={self()}>
						<Show
							when={message().is_read}
							fallback={
								<Tick
									variant="single"
									class="flex-shrink-0 self-end text-accent md:size-3.5"
								/>
							}
						>
							<Tick
								variant="double"
								class="flex-shrink-0 self-end text-accent md:size-4"
							/>
						</Show>
					</Show>
				</div>
			</div>
		</>
	);
};
