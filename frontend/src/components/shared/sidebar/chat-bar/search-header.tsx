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
				class="btn btn-sm btn-circle btn-ghost"
			>
				<UserSettings class="md:size-5" />
			</button>
			<form class="relative flex w-full items-center">
				<Search class="pointer-events-none absolute left-2 text-lg text-accent/50" />
				<input
					placeholder="Search"
					type="text"
					class="h-9 w-full rounded-full border-none bg-base-100 px-2 pl-8 text-sm text-accent outline-none ring-primary focus:ring-2"
				/>
			</form>
		</div>
	);
};
