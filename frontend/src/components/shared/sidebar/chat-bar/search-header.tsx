import { destructure } from "@solid-primitives/destructure";
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
	const { toggleView } = destructure(props);

	return (
		<div class="flex h-14 items-center gap-4 px-5 py-2">
			<div class="dropdown dropdown-bottom">
				<div
					tabindex="0"
					role="button"
				>
					<button class="text-neutral-100">
						<Menu
							variant="bars"
							class="md:size-4"
						/>
					</button>
				</div>
				<ul
					tabindex="0"
					hidden
					class="dropdown-content z-10 w-40 rounded-xl bg-base-300 p-1 shadow md:ml-1 md:mt-3"
				>
					<button
						class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
						onClick={toggleView()}
					>
						<UserSettings class="size-4" />
						<span class="text-sm font-medium">Settings</span>
					</button>
					<a
						href="https://github.com/tokitouq/telegram-re/issues"
						target="_blank"
						class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
					>
						<BugReport class="size-4" />
						<span class="text-sm font-medium">Report Bug</span>
					</a>
					<a
						href="https://github.com/tokitouq/telegram-re"
						target="_blank"
						class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
					>
						<Code class="size-4" />
						<span class="text-sm font-medium">Source</span>
					</a>
					<a
						href="https://github.com/tokitouq/telegram-re/blob/main/LICENSE"
						target="_blank"
						class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
					>
						<License class="size-4" />
						<span class="text-sm font-medium">License</span>
					</a>
					<span class="flex px-3 py-1 text-xs text-secondary">
						TG-RE version 1.0
					</span>
				</ul>
			</div>
			<form class="relative flex w-full items-center size-full">
				<Search class="pointer-events-none absolute left-3.5 size-5 text-neutral-200" />
				<input
					placeholder="Search"
					type="text"
					class="size-full rounded-full border-none bg-base-300 pr-3.5 pl-11 text-accent placeholder:text-neutral-200 caret-neutral-200 outline-none ring-primary focus:ring-2"
				/>
			</form>
		</div>
	);
};
