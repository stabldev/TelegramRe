import { Show, createEffect } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

interface Props {
	message: ChatMessage;
	self: boolean;
}

export const ChatBubble = (props: Props) => {
	const { message, self } = destructure(props);
	const formatedDate = new FormatDate(message().timestamp).format_to_relative_time;

	let el: HTMLDivElement;
	const useVisibilityObserver = createVisibilityObserver({ threshold: 1 });
	const visible = useVisibilityObserver(() => el);

	createEffect(() => {
		visible() && !self() && !message().is_read && handleReadMessage(message().id);
	}, []);

	async function handleReadMessage(id: number) {
		console.log("Message " + id + " now readed!");
		message().is_read = true;
	};

	return (
		<div
			ref={(ref) => { el = ref }}
			class="flex w-max gap-2 rounded-lg px-3 py-1 text-white"
			classList={{
				"bg-blue-500": self(),
				"bg-stone-800": !self()
			}}
		>
			<span class="self-center whitespace-pre-line text-[0.8rem]">{message().content}</span>
			<span class="select-none self-end text-[0.7rem] uppercase leading-none text-white/80">{formatedDate}</span>
			<Show when={self()}>
				<Show
					when={message().is_read}
					fallback={
						<Tick
							variant="single"
							class="self-end text-sm text-white"
						/>
					}
				>
					<Tick
						variant="double"
						class="self-end text-base text-white"
					/>
				</Show>
			</Show>
		</div>
	);
};
