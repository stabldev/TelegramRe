import { Show } from "solid-js";
import Tick from "../../assets/icons/Tick";
import { ChatType } from "../../data/mock/chat_messages";
import { FormatDate } from "../../functions/format_date";

export const ChatBlock = (props: {
	message: ChatType;
	self: boolean;
}) => {
	// destructure message
	const {
		message: {
			id,
			name,
			image,
			content,
			time,
			seen
		},
		self
	} = props;

	const formatedDate = new FormatDate(time).format_to_relative_time;

	return (
		<div
			class="text-white pl-[0.9vw] pr-[0.5vw] h-[2.15vw] flex gap-[0.5vw] w-max"
			classList={{
				"bg-stone-800": !self,
				"bg-blue-500": self
			}}
			style={{ "border-radius": "1vw 1vw 1vw 0.35vw" }}
		>
			<span class="self-center text-[0.95vw]">{content}</span>
			<span class="self-end pb-[0.15vw] text-[0.75vw] uppercase text-white/80 select-none">
				{formatedDate}
			</span>
			<Tick
				variant={seen ? "double" : "single"}
				class={`self-end pb-[0.2vw] text-white ${seen ? "text-[1.35vw]" : "text-[1.2vw]"}`}
			/>
		</div>
	);
};