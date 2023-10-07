import { Match, Show, Switch } from "solid-js";
import { FormatDate } from "../../functions/format_date";
import { ChatProps } from "../../types/Chat";
import CLock from "../../assets/icons/Clock";
import Tick from "../../assets/icons/Tick";

interface Props {
	message: ChatProps;
	self: boolean;
	lastMessage: boolean;
	middleMessage: boolean;
};

export const ChatBlock = (props: Props) => {
	// destructure message
	const { message, self, lastMessage, middleMessage } = props;
	const formatedDate = new FormatDate(message.time).format_to_relative_time;

	return (
		<div
			class="text-white pl-[0.9vw] pr-[0.5vw] py-[0.4vw] flex gap-[0.5vw] w-max"
			classList={{
				"bg-stone-800": !self,
				"bg-blue-500": self
			}}
			style={{ "border-radius": `${lastMessage || middleMessage ? "0.35vw" : "1vw"} 1vw 1vw 0.35vw` }}
		>
			<span class="self-center text-[0.95vw] whitespace-pre-line">{message.content}</span>
			<span class="self-end leading-none text-[0.75vw] uppercase text-white/80 select-none">
				{formatedDate}
			</span>
			<Show when={self}>
				<Switch fallback={
					<CLock class="self-end text-white text-[1vw]" />
				}>
					<Match when={message.status === "seen"}>
						<Tick
							variant="double"
							class="self-end text-white text-[1.15vw]"
						/>
					</Match>
					<Match when={message.status === "send"}>
						<Tick
							variant="single"
							class="self-end text-white text-[1vw]"
						/>
					</Match>
				</Switch>
			</Show>
		</div>
	);
};