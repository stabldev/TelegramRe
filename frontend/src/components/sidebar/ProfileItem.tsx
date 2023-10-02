import { A } from "@solidjs/router";
import { FormatDate } from "../../functions/format_date";

export type ProfileItemType = {
	image: string;
	name: string;
	username: string;
	timestamp: string;
	message: string;
	new_message: boolean;
};

export function ProfileItem(props: ProfileItemType) {
	const formated_timestamp = new FormatDate(props.timestamp).format_to_relative_time;

	return (
		<A
			href={`/@${props.username}`}
			class="w-full flex items-center gap-[1vw] px-[1vw] py-[0.75vw] hover:bg-stone-800"
			activeClass="bg-stone-700 hover:!bg-stone-700"
		>
			<img class="w-[3.5vw] rounded-full" src={props.image} alt={props.name} />
			<div class="flex flex-col w-full">
				<div class="flex items-center justify-between">
					<span class="text-[1.1vw] font-medium text-white">{props.name}</span>
					<span class="uppercase text-white/75 text-[0.8vw]">{formated_timestamp}</span>
				</div>
				<div>
					<span class="line-clamp-1 text-white/75 text-[1vw]">{props.message}</span>
				</div>
			</div>
		</A>
	);
};