import { A, useParams } from "solid-start";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format_date";
import { ProfileItemProps } from "~/types/profile-item";
import { createEffect, createSignal } from "solid-js";
import { get_username } from "~/functions/get_username";

export const ProfileItem = (props: ProfileItemProps) => {
	const [isActive, setIsActive] = createSignal(false);
	const params = useParams<{ username: string }>();

	const { image, message, name, timestamp, username } = destructure(props);
	const formated_timestamp = new FormatDate(timestamp()).format_to_relative_time;

	createEffect(() => {
		setIsActive(get_username(params.username) === username());
	}, [params.username])

	return (
		<A
			href={`/@${username()}`}
			class="flex w-full select-none items-center gap-[1vw] rounded-[0.75vw] px-[1vw] py-[0.75vw]"
			activeClass="bg-blue-500 hover:bg-blue-500 before:absolute before:left-[1vw] before:w-[0.35vw] before:h-[2.5vw] before:bg-white before:rounded-full before:rounded-l-none"
		>
			<img
				class="w-[3.5vw] rounded-full"
				src={image()}
				alt={name()}
			/>
			<div
				class="flex w-full flex-col"
				classList={{
					"text-white": isActive(),
					"text-white/75": !isActive(),
				}}
			>
				<div class="flex items-center justify-between">
					<span class="text-[1.1vw] font-medium text-white">{name()}</span>
					<span class="text-[0.8vw] uppercase">{formated_timestamp}</span>
				</div>
				<div>
					<span class="line-clamp-1 text-[1vw]">{message()}</span>
				</div>
			</div>
		</A>
	);
};
