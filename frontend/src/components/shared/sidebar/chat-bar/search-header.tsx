import Search from "~/icons/search";
import UserSettings from "~/icons/settings/user";

type Props = {
	toggleView: () => void;
};

export const SearchHeader = (props: Props) => {
	return (
		<div class="flex h-12 items-center gap-3 px-3">
			<button
				onClick={props.toggleView}
				class="text-xl text-white/50 transition-colors hover:text-white/75"
			>
				<UserSettings />
			</button>
			<form class="relative flex w-full items-center">
				<Search class="pointer-events-none absolute left-2 text-lg text-white/50" />
				<input
					placeholder="Search"
					type="text"
					class="h-9 w-full rounded-full border-none bg-stone-800 px-2 pl-8 text-sm text-white outline-none ring-stone-700 focus:ring-[0.1vw]"
				/>
			</form>
		</div>
	);
};
