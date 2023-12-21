import { A } from "solid-start";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format_date";
import { ProfileItemProps } from "~/types/ProfileItem";

export const ProfileItem = (props: ProfileItemProps) => {
	const { image, message, name, timestamp, username } = destructure(props);
	const formated_timestamp = new FormatDate(timestamp()).format_to_relative_time;

	return (
		<A
			href={`/@${username()}`}
			class="flex w-full select-none items-center gap-[1vw] rounded-[0.75vw] px-[1vw] py-[0.75vw]"
			activeClass="bg-stone-700 hover:!bg-stone-700 before:absolute before:left-[1vw] before:w-[0.35vw] before:h-[3vw] before:bg-blue-500 before:rounded-full"
		>
			<img
				class="w-[3.5vw] rounded-full"
				src={image()}
				alt={name()}
			/>
			<div class="flex w-full flex-col">
				<div class="flex items-center justify-between">
					<span class="text-[1.1vw] font-medium text-white">{name()}</span>
					<span class="text-[0.8vw] uppercase text-white/75">{formated_timestamp}</span>
				</div>
				<div>
					<span class="line-clamp-1 text-[1vw] text-white/75">{message()}</span>
				</div>
			</div>
		</A>
	);
};
