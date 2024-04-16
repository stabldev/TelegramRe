import { Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useChat } from "~/context/chat";
import { useShared } from "~/context/shared";
import At from "~/icons/at";
import Close from "~/icons/close";
import Info from "~/icons/info";
import Verified from "~/icons/verified";
import { Avatar } from "~/components/ui/avatar";

export const ChatSidebar = () => {
	const { toggleShowSidebar } = useShared();
	const { activeRoom } = useChat();
	const params = useParams<{ username: string }>();
	const IS_DM = activeRoom()?.type === "DM";

	return (
		<>
			<div class="h-full whitespace-nowrap border-l border-neutral-300 bg-base-200 md:w-80 absolute right-0 xl:static">
				<div class="flex md:gap-4 items-center md:px-5 h-14">
					<button
						onClick={toggleShowSidebar}
						class="md:size-10 text-neutral-100 rounded-full hover:bg-base-300 grid place-items-center"
					>
						<Close class="md:size-7" />
					</button>
					<h3 class="flex items-center font-medium text-accent md:gap-3 md:text-xl">
						User Info
					</h3>
				</div>
				<div class="aspect-square object-cover">
					<Avatar
						src={IS_DM ? activeRoom()?.member[0].avatar ?? "" : ""}
						alt={IS_DM ? activeRoom()?.member[0].full_name ?? "" : ""}
						class="object-cover text-9xl text-accent font-bold"
					/>
				</div>
				<div class="flex flex-col p-3 text-accent">
					<div class="grid grid-cols-8">
						<At class="col-span-1 size-6 self-center text-neutral-100" />
						<div class="col-span-7 flex flex-col">
							<span>
								{IS_DM
									? activeRoom()?.member[0].username
									: activeRoom()?.name}
							</span>
							<span class="select-none text-sm text-neutral-100">
								Username
							</span>
						</div>
					</div>
					<Show when={IS_DM}>
						<div class="mt-2 grid grid-cols-8">
							<Info class="col-span-1 size-[1.4rem] self-center text-neutral-100" />
							<div class="col-span-7 flex flex-col">
								<span>{activeRoom()?.member[0].bio}</span>
								<span class="select-none text-sm text-neutral-100">
									Bio
								</span>
							</div>
						</div>
					</Show>
				</div>
			</div>
		</>
	);
};
