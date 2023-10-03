import { Show } from "solid-js";
import Tick from "../../assets/icons/Tick";
import { ChatType } from "../../data/mock/chat_messages";
import { FormatDate } from "../../functions/format_date";

export const ChatBlock = (props: {
	message: ChatType;
	self: boolean;
	lastMessage: boolean;
	middleMessage: boolean;
}) => {
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
				<Tick
					variant={message.seen ? "double" : "single"}
					class={`self-end pb-[0.2vw] text-white ${message.seen ? "text-[1.35vw]" : "text-[1.2vw]"}`}
				/>
			</Show>
		</div>
	);
};