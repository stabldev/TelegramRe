import { Component } from "solid-js";
import Menu from "../../assets/icons/Menu";
import Search from "../../assets/icons/Search";

export const SearchHeader: Component = () => {
	return (
		<div class="h-[3.75vw] flex gap-[1vw] items-center px-[1vw]">
			<button class="text-white/50 text-[1.25vw] hover:text-white/75 transition-colors">
				<Menu variant="bars" />
			</button>
			<form class="relative w-full flex items-center">
				<Search class="absolute left-[1vw] text-[1.25vw] text-white/50 pointer-events-none" />
				<input
					placeholder="Search"
					type="text"
					class="border-none outline-none h-[2.5vw] w-full pl-[3vw] text-[1vw] bg-stone-800 px-[1vw] text-white rounded-full ring-stone-700 focus:ring-[0.1vw]"
				/>
			</form>
		</div>
	);
};