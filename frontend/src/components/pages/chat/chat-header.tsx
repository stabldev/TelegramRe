import { Component, For, JSX, Show } from "solid-js";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import Menu from "~/icons/menu";
import Phone from "~/icons/phone";
import Search from "~/icons/search";
import Split from "~/icons/split";

export const ChatHeader: Component = () => {
	const { toggleShowSidebar } = useShared();
	const { onlineUsers, activeRoom } = useChat();

	const IS_DM = activeRoom()?.type === "DM";

	const icon_mapping: {
		[key: string]: {
			icon: JSX.Element;
			onClick?: () => void;
		};
	} = {
		search: {
			icon: <Search />
		},
		phone: {
			icon: <Phone />
		},
		split: {
			icon: <Split />,
			onClick: () => toggleShowSidebar()
		},
		menu: {
			icon: <Menu variant="dots" />
		}
	};

	return (
		<div class="flex h-12 select-none items-center justify-between border-b-[0.1vw] border-black/50 bg-base-300 px-3">
			<button
				onClick={toggleShowSidebar}
				class="flex items-center gap-3"
			>
				<Show when={IS_DM}>
					<img
						src={activeRoom()?.member[0].avatar ?? ""}
						alt="anya-forger"
						class="size-8 rounded-full"
					/>
				</Show>
				<div class="flex flex-col items-start leading-none text-secondary">
					<span class="text-sm font-medium text-accent">{IS_DM ? activeRoom()?.member[0].full_name : activeRoom()?.name}</span>
					<Show
						when={IS_DM && onlineUsers()?.some((user) => user.user === activeRoom()?.member[0].id)}
						fallback={<span class="text-xs">Offline</span>}
					>
						<span class="text-xs">Online</span>
					</Show>
				</div>
			</button>
			<div class="flex items-center gap-2">
				<For each={Object.values(icon_mapping)}>
					{(icon) => (
						<button
							onClick={icon.onClick}
							disabled={icon.onClick === undefined}
							class="btn btn-square btn-sm text-base btn-ghost text-neutral-content/75"
						>
							{icon.icon}
						</button>
					)}
				</For>
			</div>
		</div>
	);
};
