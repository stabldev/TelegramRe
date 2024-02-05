import { useAuth } from "~/context/auth";
import { SettingsHeader } from "./settings-header";
import { useChat } from "~/context/chat";
import Photo from "~/icons/photo";
import At from "~/icons/at";
import Info from "~/icons/info";
import Verified from "~/icons/verified";
import { Show } from "solid-js";

type Props = {
	toggleView: () => void;
};

export const SettingsBar = (props: Props) => {
	const { user } = useAuth();
	const { onlineUsers } = useChat();

	return (
		<>
			<SettingsHeader toggleView={props.toggleView} />
			<div class="text-stone-100">
				<div class="w-ful relative h-56">
					<img
						src={user()?.avatar ?? ""}
						alt={user()?.username}
						class="size-full object-cover"
					/>
					<button class="absolute -bottom-7 right-3 rounded-full bg-blue-500 p-4">
						<Photo class="text-xl text-white" />
					</button>
				</div>
				<div class="flex flex-col p-3 text-white">
					<div class="flex items-center gap-2">
						<span class="font-medium md:text-lg">{user()?.first_name + " " + user()?.last_name}</span>
						<Show when={user()?.is_verified}>
							<Verified class="text-xl text-blue-500" />
						</Show>
					</div>
					<span class="text-sm text-stone-400">{onlineUsers()?.some((onlineUser) => onlineUser.user === user()?.id) ? "Online" : "Offline"}</span>

					<div class="mt-3 grid grid-cols-8">
						<At class="col-span-1 size-6 self-center text-stone-400" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.username}</span>
							<span class="select-none text-sm text-stone-400">Username</span>
						</div>
					</div>
					<div class="mt-2 grid grid-cols-8">
						<Info class="col-span-1 size-[1.4rem] self-center text-stone-400" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.bio}</span>
							<span class="select-none text-sm text-stone-400">Bio</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
