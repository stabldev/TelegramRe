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
			class="flex flex-col w-max max-w-md gap-1 rounded-lg px-2.5 py-1 text-white overflow-hidden"
			classList={{
				"bg-blue-500": self(),
				"bg-stone-800": !self(),
				"!p-0 !max-w-60": message().type === "image",
			}}
		>
			<Show when={message().type == "image" || message().type === "gif"}>
				<img
					src={message().file!}
					alt="Image"
					class="cursor-pointer"
				/>
			</Show>
			<div class="flex gap-1 w-full" classList={{ "px-2.5 pb-1": message().type === "image" }}>
				<span class="whitespace-pre-line text-[0.8rem] leading-snug">{message().content}</span>
				<span class="select-none self-end ml-auto text-[0.7rem] uppercase leading-none text-white/80">{formatedDate}</span>
				<Show when={self()}>
					<Show
						when={message().is_read}
						fallback={
							<Tick
								variant="single"
								class="self-end md:size-3.5 flex-shrink-0 text-white"
							/>
						}
					>
						<Tick
							variant="double"
							class="self-end md:size-4 flex-shrink-0 text-white"
						/>
					</Show>
				</Show>
			</div>
		</div>
	);
};
