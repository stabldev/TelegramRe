import { Component } from "solid-js";
import Menu from "~/icons/menu";
import Search from "~/icons/search";

export const SearchHeader: Component = () => {
	return (
		<div class="flex h-12 items-center gap-3 px-3">
			<button class="text-lg text-white/50 transition-colors hover:text-white/75">
				<Menu variant="bars" />
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
