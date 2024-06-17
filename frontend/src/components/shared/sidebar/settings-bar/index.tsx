import { useAuth } from "~/context/auth";
import { SettingsHeader } from "./settings-header";
import At from "~/icons/at";
import Info from "~/icons/info";
import Verified from "~/icons/verified";
import { Show } from "solid-js";
import Avatar from "~/components/ui/avatar";

type Props = {
	toggleView: () => void;
};

const SettingsBar = (props: Props) => {
	const { user } = useAuth();

	return (
		<>
			<SettingsHeader toggleView={props.toggleView} />
			<div class="text-accent">
				<div class="relative aspect-square">
					<Avatar
						src={user()?.avatar ?? ""}
						alt={user()?.username ?? ""}
						class="object-cover text-[15rem] font-bold text-accent"
					/>
					<div class="absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-end bg-gradient-to-t from-base-200/50 to-transparent md:gap-1.5 md:px-5 md:py-2">
						<span class="inline-flex gap-2 text-xl font-medium leading-none text-accent">
							{user()?.first_name + " " + user()?.last_name}
							<Show when={user()?.is_verified}>
								<Verified class="text-xl text-accent" />
							</Show>
						</span>
						<span class="text-sm leading-none text-accent/50">
							last seen recently
						</span>
					</div>
				</div>
				<div class="flex flex-col gap-3 p-5 text-accent">
					<div class="grid grid-cols-8">
						<At class="col-span-1 size-6 self-center text-neutral-100" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.username}</span>
							<span class="select-none text-sm text-neutral-100">Username</span>
						</div>
					</div>
					<div class="grid grid-cols-8">
						<Info class="col-span-1 size-[1.4rem] self-center text-neutral-100" />
						<div class="col-span-7 flex flex-col">
							<span>{user()?.bio}</span>
							<span class="select-none text-sm text-neutral-100">Bio</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsBar;
