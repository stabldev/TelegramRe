import { Show, createEffect } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { useChat } from "~/context/chat";

interface Props {
	message: ChatMessage;
	self: boolean;
}

export const ChatBubble = (props: Props) => {
	const { socket, activeRoom } = useChat();
	const { message, self } = destructure(props);
	const formatedDate = new FormatDate(message().timestamp).format_to_relative_time;

	let el: HTMLDivElement;
	const useVisibilityObserver = createVisibilityObserver({ threshold: 1 });
	const visible = useVisibilityObserver(() => el);

	createEffect(() => {
		visible() && !self() && !message().is_read && handleReadMessage(message().id);
	}, []);

	async function handleReadMessage(id: number) {
		message().is_read = true;
		// send socket action
		socket()!.send(
			JSON.stringify({
				action: "read_message",
				message_id: message().id,
				room_id: activeRoom()?.room_id
			})
		);
	}

	return (
		<div
			ref={(ref) => {
				el = ref;
			}}
			class="relative flex w-max max-w-md flex-col gap-1 overflow-hidden rounded-xl px-2.5 py-1 text-white"
			classList={{
				"bg-blue-500 rounded-r": self(),
				"bg-stone-800 rounded-l": !self(),
				"!p-0 !max-w-60": message().type === "image",
				"!p-0 overflow-visible bg-transparent": message().type === "gif"
			}}
		>
			<Show when={message().type == "image" || message().type === "gif"}>
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
				<span class="absolute left-0 top-0 m-1 w-max rounded-md bg-black/50 p-1 text-xs text-white/80">GIF</span>
			</Show>
			<div
				class="flex w-full gap-1"
				classList={{
					"px-2.5 pb-1": message().type === "image",
					"absolute bottom-0 right-0 p-1 bg-black/50 w-max rounded-md m-1": message().type === "gif"
				}}
			>
				<span class="whitespace-pre-line text-[0.8rem] leading-snug">{message().content}</span>
				<span class="ml-auto select-none self-end text-[0.7rem] uppercase leading-none text-white/80">{formatedDate}</span>
				<Show when={self()}>
					<Show
						when={message().is_read}
						fallback={
							<Tick
								variant="single"
								class="flex-shrink-0 self-end text-white md:size-3.5"
							/>
						}
					>
						<Tick
							variant="double"
							class="flex-shrink-0 self-end text-white md:size-4"
						/>
					</Show>
				</Show>
			</div>
		</div>
	);
};
