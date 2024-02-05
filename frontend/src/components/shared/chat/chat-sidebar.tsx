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
			<div class="h-full whitespace-nowrap border-l border-black/50 bg-stone-900 md:w-80">
				<div class="flex items-center justify-between md:p-3">
					<h3 class="flex items-center font-medium text-stone-200 md:gap-3 md:text-sm">
						Profile
						<span class="font-normal text-stone-400">{params.username}</span>
					</h3>
					<button onClick={toggleShowSidebar}>
						<Close class="text-white/50 transition-colors hover:text-white/75 md:size-6" />
					</button>
				</div>
				<img
					src={IS_DM ? activeRoom()?.member[0].avatar ?? "" : ""}
					class="object-cover w-full h-56"
				/>
				<div class="flex flex-col text-white p-3">
                    <div class="flex items-center gap-2">
						<span class="font-medium md:text-lg">
							{IS_DM ? activeRoom()?.member[0].full_name : activeRoom()?.name}
						</span>
						<Show when={activeRoom()?.member[0].is_verified}>
							<Verified class="text-xl text-blue-500" />
						</Show>
					</div>
                    <Show when={IS_DM}>
						<span class="text-stone-400 text-sm">
							{onlineUsers()?.some((onlineUser) =>
								onlineUser.user === activeRoom()?.member[0].id) ? "Online" : "Offline"}
						</span>
					</Show>

                    <div class="grid grid-cols-8 mt-3">
                        <At class="col-span-1 size-6 self-center text-stone-400" />
                        <div class="flex flex-col col-span-7">
                            <span>{IS_DM ? activeRoom()?.member[0].username : activeRoom()?.name}</span>
                            <span class="text-stone-400 text-sm select-none">Username</span>
                        </div>
                    </div>
                    <Show when={IS_DM}>
						<div class="grid grid-cols-8 mt-2">
							<Info class="col-span-1 size-[1.4rem] self-center text-stone-400" />
							<div class="flex flex-col col-span-7">
								<span>{activeRoom()?.member[0].bio}</span>
								<span class="text-stone-400 text-sm select-none">Bio</span>
							</div>
						</div>
					</Show>
                </div>
			</div>
		</>
	);
};
