import {
	Component,
	For,
	JSX,
	Show,
	createEffect,
	createSignal
} from "solid-js";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import Menu from "~/icons/menu";
import Search from "~/icons/search";
import Avatar from "~/components/ui/avatar";

const ChatHeader: Component = () => {
	const { toggleShowSidebar } = useShared();
	const { onlineUsers, activeRoom } = useChat();

	const [isOnline, setIsOnline] = createSignal(false);
	const IS_DM = activeRoom()?.type === "DM";

	const icon_mapping: {
		[key: string]: {
			icon: JSX.Element;
			disabled: boolean;
			onClick?: () => void;
		};
	} = {
		search: {
			icon: <Search />,
			disabled: false
		},
		menu: {
			icon: <Menu variant="dots" />,
			disabled: false
		}
	};

	createEffect(() => {
		setIsOnline(
			onlineUsers()?.some(
				(user) => user.user === activeRoom()?.member[0].id
			)
				? true
				: false
		);
	});

	return (
		<div class="flex h-14 select-none items-center justify-between bg-base-200 px-5">
			<button
				onClick={toggleShowSidebar}
				class="flex items-center gap-3"
			>
				<Show when={IS_DM}>
					<div class="size-10">
						<Avatar
							src={activeRoom()?.member[0].avatar ?? ""}
							alt={
								activeRoom()?.member[0].full_name ??
								"Telegram User"
							}
							class="rounded-full text-lg font-bold text-accent"
						/>
					</div>
				</Show>
				<div class="text-secondary flex flex-col items-start leading-none">
					<span class="text-base font-medium text-accent">
						{IS_DM
							? activeRoom()?.member[0].full_name
							: activeRoom()?.name}
					</span>
					<Show
						when={IS_DM && isOnline()}
						fallback={
							<span class="text-sm font-normal text-neutral-100">
								last seen recently
							</span>
						}
					>
						<span class="text-xs font-normal">online</span>
					</Show>
				</div>
			</button>
			<div class="flex items-center gap-1">
				<For each={Object.values(icon_mapping)}>
					{(icon) => (
						<button
							onClick={icon.onClick}
							disabled={icon.disabled}
							class="grid size-10 place-items-center rounded-full text-xl text-neutral-100 hover:bg-neutral-300 disabled:pointer-events-none disabled:opacity-50"
						>
							{icon.icon}
						</button>
					)}
				</For>
			</div>
		</div>
	);
};

export default ChatHeader;
