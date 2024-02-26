import { Show } from "solid-js";
import { useParams } from "solid-start";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import At from "~/icons/at";
import Close from "~/icons/close";
import Info from "~/icons/info";
import Verified from "~/icons/verified";

export const ChatSidebar = () => {
	const { toggleShowSidebar } = useShared();
	const { activeRoom, onlineUsers } = useChat();
	const params = useParams<{ username: string }>();
	const IS_DM = activeRoom()?.type === "DM";

	return (
		<>
			<div class="h-full whitespace-nowrap border-l border-black/50 bg-base-300 md:w-80">
				<div class="flex items-center justify-between md:px-3 md:py-2">
					<h3 class="flex items-center font-medium text-accent md:gap-3 md:text-sm">
						Profile
						<span class="font-normal text-secondary">{params.username}</span>
					</h3>
					<button
						onClick={toggleShowSidebar}
						class="btn btn-ghost btn-circle btn-sm text-neutral-content/75"
					>
						<Close class="md:size-6" />
					</button>
				</div>
				<img
					src={IS_DM ? activeRoom()?.member[0].avatar ?? "" : ""}
					class="h-56 w-full object-cover"
				/>
				<div class="flex flex-col p-3 text-accent">
					<div class="flex items-center gap-2">
						<span class="font-medium md:text-lg">{IS_DM ? activeRoom()?.member[0].full_name : activeRoom()?.name}</span>
						<Show when={activeRoom()?.member[0].is_verified}>
							<Verified class="text-xl text-primary" />
						</Show>
					</div>
					<Show when={IS_DM}>
						<Show
							when={onlineUsers()?.some((onlineUser) => onlineUser.user === activeRoom()?.member[0].id)}
							fallback={<span class="text-sm text-secondary">Offline</span>}
						>
							<span class="text-sm text-info">Online</span>
						</Show>
					</Show>

					<div class="mt-3 grid grid-cols-8">
						<At class="col-span-1 size-6 self-center text-secondary" />
						<div class="col-span-7 flex flex-col">
							<span>{IS_DM ? activeRoom()?.member[0].username : activeRoom()?.name}</span>
							<span class="select-none text-sm text-secondary">Username</span>
						</div>
					</div>
					<Show when={IS_DM}>
						<div class="mt-2 grid grid-cols-8">
							<Info class="col-span-1 size-[1.4rem] self-center text-secondary" />
							<div class="col-span-7 flex flex-col">
								<span>{activeRoom()?.member[0].bio}</span>
								<span class="select-none text-sm text-secondary">Bio</span>
							</div>
						</div>
					</Show>
				</div>
			</div>
		</>
	);
};
