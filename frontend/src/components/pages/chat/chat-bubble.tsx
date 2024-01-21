import { Match, Show, Switch } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import Tick from "~/icons/tick";
import CLock from "~/icons/clock";
import { ChatProps } from "~/types/chat.types";

interface Props {
	message: ChatProps;
	self: boolean;
}

export const ChatBubble = (props: Props) => {
	const { message, self } = destructure(props);
	const formatedDate = new FormatDate(message().time).format_to_relative_time;

	return (
		<div
			class="flex w-max gap-2 rounded-lg py-1 px-3 text-white"
			classList={{
				"bg-blue-500": self(),
				"bg-stone-800": !self(),
			}}
		>
			<span class="self-center whitespace-pre-line text-[0.8rem]">{message().content}</span>
			<span class="select-none self-end text-[0.7rem] uppercase leading-none text-white/80">{formatedDate}</span>
			<Show when={self()}>
				<Switch fallback={<CLock class="self-end text-sm text-white" />}>
					<Match when={message().status === "seen"}>
						<Tick
							variant="double"
							class="self-end text-base text-white"
						/>
					</Match>
					<Match when={message().status === "send"}>
						<Tick
							variant="single"
							class="self-end text-sm text-white"
						/>
					</Match>
				</Switch>
			</Show>
		</div>
	);
};
