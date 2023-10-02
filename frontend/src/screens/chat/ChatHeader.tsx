import { Component } from "solid-js";
import Bars from "../../assets/icons/Menu";
import Phone from "../../assets/icons/Phone";
import Search from "../../assets/icons/Search";
import Split from "../../assets/icons/Split";

export const ChatHeader: Component = () => {
	return (
		<div class="h-[3.75vw] flex items-center justify-between bg-stone-900 px-[1vw] select-none">
			<div class="flex items-center gap-[1vw]">
				<img
					src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
					alt="anya-forger"
					class="w-[2.5vw] rounded-full"
				/>
				<div class="flex flex-col leading-none gap-[0.25vw]">
					<span class="text-white font-medium text-[1vw]">Anya Forger</span>
					<span class="text-white/50 text-[0.9vw]">last seen recently</span>
				</div>
			</div>
			{/* Mock icons ( will be replaced ) */}
			<div class="flex items-center gap-[1vw] text-white/50 text-[1.35vw]">
				<button><Search class="hover:text-white/75 transition-colors" /></button>
				<button><Phone class="hover:text-white/75 transition-colors" /></button>
				<button><Split class="hover:text-white/75 transition-colors" /></button>
				<button><Bars class="hover:text-white/75 transition-colors" variant="dots" /></button>
			</div>
		</div>
	);
};