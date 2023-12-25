import { Match, Show, Switch } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import type { ChatProps } from "~/types/chat";
import Tick from "~/icons/tick";
import CLock from "~/icons/clock";

interface Props {
	message: ChatProps;
	self: boolean;
	firstMessage: boolean;
	lastMessage: boolean;
	middleMessage: boolean;
}

export const ChatBubble = (props: Props) => {
	const { message, self, lastMessage, middleMessage, firstMessage } = destructure(props);
	const formatedDate = new FormatDate(message().time).format_to_relative_time;

	return (
		<div
			class="flex w-max gap-[0.5vw] py-[0.4vw] pl-[0.9vw] pr-[0.5vw] text-white rounded-[1vw]"
			classList={{
				// If sender is logged in user
				"bg-blue-500": self(),
				"rounded-br-[0.35vw]": self() && firstMessage(),
				"rounded-r-[0.35vw]": self() && middleMessage(),
				"rounded-tr-[0.35vw]": self() && lastMessage(),
				// Else
				"bg-stone-800": !self(),
				"rounded-bl-[0.35vw]": !self() && firstMessage(),
				"rounded-l-[0.35vw]": !self() && middleMessage(),
				"rounded-bl-[1vw] rounded-tl-[0.35vw]": !self() && lastMessage(),
			}}
		>
			<span class="self-center whitespace-pre-line text-[0.95vw] md:leading-[1.25vw]">{message().content}</span>
			<span class="select-none self-end text-[0.75vw] uppercase leading-none text-white/80">{formatedDate}</span>
			<Show when={self()}>
				<Switch fallback={<CLock class="self-end text-[1vw] text-white" />}>
					<Match when={message().status === "seen"}>
						<Tick
							variant="double"
							class="self-end text-[1.15vw] text-white"
						/>
					</Match>
					<Match when={message().status === "send"}>
						<Tick
							variant="single"
							class="self-end text-[1vw] text-white"
						/>
					</Match>
				</Switch>
			</Show>
		</div>
	);
};