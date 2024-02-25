import { Component, For, JSX, Show, createEffect, createSignal } from "solid-js";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import Menu from "~/icons/menu";
import Phone from "~/icons/phone";
import Search from "~/icons/search";
import Split from "~/icons/split";

export const ChatHeader: Component = () => {
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
			disabled: true,
		},
		phone: {
			icon: <Phone />,
			disabled: true,
		},
		split: {
			icon: <Split />,
			onClick: () => toggleShowSidebar(),
			disabled: false,
		},
		menu: {
			icon: <Menu variant="dots" />,
			disabled: false,
		}
	};

	createEffect(() => {
		setIsOnline(onlineUsers()?.some((user) => user.user === activeRoom()?.member[0].id) ? true : false);
	}, [onlineUsers, activeRoom]);

	return (
		<div class="flex h-12 select-none items-center justify-between border-b-[0.1vw] border-black/50 bg-base-300 px-3">
			<button
				onClick={toggleShowSidebar}
				class="flex items-center gap-3 btn bg-transparent border-none p-0"
			>
				<Show when={IS_DM}>
					<img
						src={activeRoom()?.member[0].avatar ?? ""}
						alt="anya-forger"
						class="size-7 rounded-full ring-2 ring-secondary/50 ring-offset-base-300 ring-offset-2"
						classList={{
							"!ring-primary": isOnline(),
						}}
					/>
				</Show>
				<div class="flex flex-col items-start leading-none text-secondary">
					<span class="text-sm font-medium text-accent">{IS_DM ? activeRoom()?.member[0].full_name : activeRoom()?.name}</span>
					<Show
						when={IS_DM && isOnline()}
						fallback={<span class="text-xs font-normal">Offline</span>}
					>
						<span class="text-xs font-normal">Online</span>
					</Show>
				</div>
			</button>
			<div class="flex items-center gap-1">
				<For each={Object.values(icon_mapping)}>
					{(icon) => (
						<button
							onClick={icon.onClick}
							disabled={icon.disabled}
							class="btn btn-circle btn-sm text-base btn-ghost text-neutral-content/75"
						>
							{icon.icon}
						</button>
					)}
				</For>
			</div>
		</div>
	);
};
