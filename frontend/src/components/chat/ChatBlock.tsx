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
			class="text-white pl-[0.9vw] pr-[0.5vw] h-[2.15vw] flex gap-[0.5vw] w-max"
			classList={{
				"bg-stone-800": !self,
				"bg-blue-500": self
			}}
			style={{ "border-radius": `${lastMessage || middleMessage ? "0.35vw" : "1vw"} 1vw 1vw 0.35vw` }}
		>
			<span class="self-center text-[0.95vw]">{message.content}</span>
			<span class="self-end pb-[0.15vw] text-[0.75vw] uppercase text-white/80 select-none">
				{formatedDate}
			</span>
			<Show when={self}>
				<Switch fallback={
					<CLock class="self-end pb-[0.2vw] text-white text-[1.2vw]" />
				}>
					<Match when={message.status === "seen"}>
						<Tick
							variant="double"
							class="self-end pb-[0.2vw] text-white text-[1.35vw]"
						/>
					</Match>
					<Match when={message.status === "send"}>
						<Tick
							variant="single"
							class="self-end pb-[0.2vw] text-white text-[1.2vw]"
						/>
					</Match>
				</Switch>
			</Show>
		</div>
	);
};