import { A, useParams } from "solid-start";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import { Show, createEffect, createSignal } from "solid-js";
import { get_username } from "~/functions/get-username";
import { InboxItem } from "~/types/inbox.types";
import { useAuth } from "~/context/auth";
import Tick from "~/icons/tick";
import { useShared } from "~/context/shared";

export const ProfileItem = (props: InboxItem) => {
	const { user } = useAuth();
	const { setActiveChatUser } = useShared();
	const [isActive, setIsActive] = createSignal(false);
	const params = useParams<{ username: string }>();

	const { message, sender, reciever, date, is_read } = destructure(props);

	const chat_user = sender().id !== user()?.id ? sender : reciever;
	const self_chat = sender().id === user()?.id;
	const formated_timestamp = new FormatDate(date()).format_to_relative_time;

	const handleChatClick = () => {
		setActiveChatUser(chat_user);
	};

	createEffect(() => {
		if (!params.username) return;
		setIsActive(get_username(params.username) === chat_user().username);
	}, [params.username]);

	return (
		<A
			href={`/@${chat_user().username}`}
			class="flex w-full select-none items-center gap-3 rounded-lg px-3 py-2"
			activeClass="bg-blue-500 hover:bg-blue-500 before:absolute before:left-3 before:w-1 before:h-8 before:bg-blue-50 before:rounded-full before:rounded-l-none"
			onClick={handleChatClick}
		>
			<div class="relative size-12 flex-shrink-0">
				<img
					class="size-full rounded-full"
					src={chat_user().avatar ?? ""}
					alt={chat_user().username}
				/>
				<Show when={chat_user().online}>
					<div
						class="md:size-2.5 rounded-full absolute bottom-0 right-0 ring-4"
						classList={{ 
							"ring-blue-500 bg-white": isActive(),
							"ring-stone-900 bg-blue-500": !isActive(),
						}}
					/>
				</Show>
			</div>
			<div
				class="flex w-full flex-col"
				classList={{
					"text-white": isActive(),
					"text-white/75": !isActive()
				}}
			>
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-white">{chat_user().first_name + " " + chat_user().last_name}</span>
					<span class="text-xs uppercase">{formated_timestamp}</span>
				</div>
				<div class="flex items-center justify-between md:gap-3">
					<span class="line-clamp-1 text-sm">{message()}</span>
					<Show
						when={self_chat}
						fallback={
							<Show when={!is_read()}>
								<span class="grid place-items-center rounded-full bg-blue-500 font-semibold leading-none md:size-5 md:text-xs">1</span>
							</Show>
						}
					>
						<Show
							when={is_read}
							fallback={
								<Tick
									variant="single"
									class="text-sm text-white"
								/>
							}
						>
							<Tick
								variant="double"
								class="text-lg text-blue-300"
								classList={{ "!text-white": isActive() }}
							/>
						</Show>
					</Show>
				</div>
			</div>
		</A>
	);
};
