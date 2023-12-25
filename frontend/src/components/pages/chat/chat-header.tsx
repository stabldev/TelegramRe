import { Component } from "solid-js";
import Menu from "~/icons/menu";
import Phone from "~/icons/phone";
import Search from "~/icons/search";
import Split from "~/icons/split";

export const ChatHeader: Component = () => {
	return (
		<div class="flex h-[3.75vw] select-none items-center justify-between bg-stone-900 px-[1vw] border-b-[0.1vw] border-black/50">
			<div class="flex items-center gap-[1vw]">
				<img
					src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
					alt="anya-forger"
					class="w-[2.5vw] rounded-full"
				/>
				<div class="flex flex-col gap-[0.25vw] leading-none">
					<span class="text-[1vw] font-medium text-white">Anya Forger</span>
					<span class="text-[0.9vw] text-white/50">last seen recently</span>
				</div>
			</div>
			{/* Mock icons ( will be replaced ) */}
			<div class="flex items-center gap-[1vw] text-[1.35vw] text-white/50">
				<button>
					<Search class="transition-colors hover:text-white/75" />
				</button>
				<button>
					<Phone class="transition-colors hover:text-white/75" />
				</button>
				<button>
					<Split class="transition-colors hover:text-white/75" />
				</button>
				<button>
					<Menu
						class="transition-colors hover:text-white/75"
						variant="dots"
					/>
				</button>
			</div>
		</div>
	);
};
