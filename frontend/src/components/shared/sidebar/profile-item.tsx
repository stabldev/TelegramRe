import { A, useParams } from "solid-start";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import { ProfileItemProps } from "~/types/profile-item";
import { createEffect, createSignal } from "solid-js";
import { get_username } from "~/functions/get-username";

export const ProfileItem = (props: ProfileItemProps) => {
	const [isActive, setIsActive] = createSignal(false);
	const params = useParams<{ username: string }>();

	const { image, message, name, timestamp, username } = destructure(props);
	const formated_timestamp = new FormatDate(timestamp()).format_to_relative_time;

	createEffect(() => {
		if (!params.username) return;
		setIsActive(get_username(params.username) === username());
	}, [params.username]);

	return (
		<A
			href={`/@${username()}`}
			class="flex w-full select-none items-center gap-3 rounded-lg px-3 py-2"
			activeClass="bg-blue-500 hover:bg-blue-500 before:absolute before:left-3 before:w-1 before:h-8 before:bg-blue-50 before:rounded-full before:rounded-l-none"
		>
			<img
				class="size-12 rounded-full"
				src={image()}
				alt={name()}
			/>
			<div
				class="flex w-full flex-col"
				classList={{
					"text-white": isActive(),
					"text-white/75": !isActive()
				}}
			>
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-white">{name()}</span>
					<span class="text-xs uppercase">{formated_timestamp}</span>
				</div>
				<div>
					<span class="line-clamp-1 text-sm">{message()}</span>
				</div>
			</div>
		</A>
	);
};
