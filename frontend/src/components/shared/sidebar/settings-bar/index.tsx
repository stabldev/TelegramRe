import { useAuth } from "~/context/auth";
import { SettingsHeader } from "./settings-header";
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

	return (
		<>
			<SettingsHeader toggleView={props.toggleView} />
			<div class="text-accent">
				<div class="w-ful relative h-56">
					<img
						src={user()?.avatar ?? ""}
						alt={user()?.username}
						class="size-full object-cover"
					/>
					<button class="btn btn-circle btn-primary absolute -bottom-7 right-3">
						<Photo class="text-xl text-accent" />
					</button>
				</div>
				<div class="flex flex-col p-3 text-accent">
					<div class="flex items-center gap-2">
						<span class="font-medium md:text-lg">
							{user()?.first_name + " " + user()?.last_name}
						</span>
						<Show when={user()?.is_verified}>
							<Verified class="text-xl text-primary" />
						</Show>
					</div>
					<div class="mt-3 grid grid-cols-8">
						<At class="col-span-1 size-6 self-center text-secondary" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.username}</span>
							<span class="select-none text-sm text-secondary">Username</span>
						</div>
					</div>
					<div class="mt-2 grid grid-cols-8">
						<Info class="col-span-1 size-[1.4rem] self-center text-secondary" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.bio}</span>
							<span class="select-none text-sm text-secondary">Bio</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
