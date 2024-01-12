import { useParams } from "solid-start";
import { useShared } from "~/context/shared";
import Close from "~/icons/close";

export const ChatSidebar = () => {
	const { toggleShowSidebar } = useShared();
	const params = useParams<{ username: string }>();

	return (
		<>
			<div
				class="h-full whitespace-nowrap border-l-[0.1vw] border-black/50 bg-stone-900 md:w-full"
				style={{ "max-height": "calc(100vh - 3.75vw)" }}
			>
				<div class="flex items-center justify-between md:p-[1vw]">
					<h3 class="flex items-center font-medium text-stone-200 md:gap-[0.75vw] md:text-[1.25vw]">
						Profile
						<span class="font-normal text-stone-400 md:text-[1vw]">{params.username}</span>
					</h3>
					<button onClick={toggleShowSidebar}>
						<Close class="text-white/50 transition-colors hover:text-white/75 md:w-[1.75vw]" />
					</button>
				</div>
				<img
					src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
					class="object-cover md:size-[25vw]"
				/>
				<div class="flex flex-col leading-none md:gap-[0.5vw] md:p-[1vw]">
					<h3 class="font-medium text-stone-100 md:text-[1.25vw]">Anya Forger</h3>
					<h5 class="text-stone-400 md:text-[1vw]">Joined Date: Dec 25, 2023</h5>
				</div>
				<div class="flex flex-col leading-none md:hidden md:gap-[0.5vw] md:p-[1vw]">
					<h5 class="text-stone-400 md:text-[1vw]">BIO:</h5>
					<h4>🎬🎶 Let's dive into the colorful world of anime together! 🔥🎭 Embracing the epic battles and strong heroines of anime.</h4>
				</div>
			</div>
		</>
	);
};
