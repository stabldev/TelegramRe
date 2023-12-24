import { Component } from "solid-js";
import Menu from "~/icons/menu";
import Search from "~/icons/search";

export const SearchHeader: Component = () => {
	return (
		<div class="flex h-[3.75vw] items-center gap-[1vw] px-[1vw]">
			<button class="text-[1.25vw] text-white/50 transition-colors hover:text-white/75">
				<Menu variant="bars" />
			</button>
			<form class="relative flex w-full items-center">
				<Search class="pointer-events-none absolute left-[1vw] text-[1.25vw] text-white/50" />
				<input
					placeholder="Search"
					type="text"
					class="h-[2.5vw] w-full rounded-full border-none bg-stone-800 px-[1vw] pl-[3vw] text-[1vw] text-white outline-none ring-stone-700 focus:ring-[0.1vw]"
				/>
			</form>
		</div>
	);
};
