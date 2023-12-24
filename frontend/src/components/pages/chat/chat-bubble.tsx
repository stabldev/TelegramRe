import { Match, Show, Switch } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format_date";
import { ChatProps } from "~/types/chat";
import Tick from "~/icons/tick";
import CLock from "~/icons/clock";

interface Props {
	message: ChatProps;
	self: boolean;
	lastMessage: boolean;
	middleMessage: boolean;
}

export const ChatBubble = (props: Props) => {
	const { message, self, lastMessage, middleMessage } = destructure(props);
	const formatedDate = new FormatDate(message().time).format_to_relative_time;

	return (
		<div
			class="flex w-max gap-[0.5vw] py-[0.4vw] pl-[0.9vw] pr-[0.5vw] text-white"
			classList={{
				"bg-stone-800": !self(),
				"bg-blue-500": self()
			}}
			style={{
				"border-radius": `${lastMessage() || middleMessage() ? "0.35vw" : "1vw"} 1vw 1vw 0.35vw`
			}}
		>
			<span class="self-center whitespace-pre-line text-[0.95vw]">{message().content}</span>
			<span class="select-none self-end text-[0.75vw] uppercase leading-none text-white/80">{formatedDate}</span>
			<Show when={self}>
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