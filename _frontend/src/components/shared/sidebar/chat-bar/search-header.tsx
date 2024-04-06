import Code from "~/icons/code";
import License from "~/icons/license";
import Menu from "~/icons/menu";
import BugReport from "~/icons/report";
import Search from "~/icons/search";
import UserSettings from "~/icons/settings/user";

type Props = {
	toggleView: () => void;
};

export const SearchHeader = (props: Props) => {
	return (
		<div class="flex h-12 items-center gap-3 px-3">
			<div class="dropdown dropdown-bottom">
				<div tabindex="0" role="button">
					<button class="btn btn-sm btn-circle btn-ghost text-neutral-content/75">
						<Menu variant="bars" class="md:size-4" />
					</button>
				</div>
				<ul tabindex="0" class="dropdown-content z-10 p-1 md:mt-3 md:ml-1 shadow bg-base-300 w-40 rounded-xl">
					<button
						class="flex items-center w-full gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
						onClick={props.toggleView}
					>
						<UserSettings class="size-4" />
						<span class="text-sm font-medium">Settings</span>
					</button>
					<a
						href="https://github.com/tokitouq/telegram-re/issues"
						target="_blank"
						class="flex items-center w-full gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
					>
						<BugReport class="size-4" />
						<span class="text-sm font-medium">Report Bug</span>
					</a>
					<a
						href="https://github.com/tokitouq/telegram-re"
						target="_blank"
						class="flex items-center w-full gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
					>
						<Code class="size-4" />
						<span class="text-sm font-medium">Source</span>
					</a>
					<a
						href="https://github.com/tokitouq/telegram-re/blob/main/LICENSE"
						target="_blank"
						class="flex items-center w-full gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
					>
						<License class="size-4" />
						<span class="text-sm font-medium">License</span>
					</a>
					<span class="flex px-3 py-1 text-xs text-secondary">TG-RE version 1.0</span>
				</ul>
			</div>
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
