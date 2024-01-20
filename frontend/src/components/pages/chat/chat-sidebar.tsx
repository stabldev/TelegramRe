import { useParams } from "solid-start";
import { useShared } from "~/context/shared";
import Close from "~/icons/close";

export const ChatSidebar = () => {
	const { toggleShowSidebar } = useShared();
	const params = useParams<{ username: string }>();

	return (
		<>
			<div class="h-full whitespace-nowrap border-l-[0.1vw] border-black/50 bg-stone-900 md:w-80">
				<div class="flex items-center justify-between md:p-3">
					<h3 class="flex items-center font-medium text-stone-200 md:gap-3 md:text-sm">
						Profile
						<span class="font-normal text-stone-400">{params.username}</span>
					</h3>
					<button onClick={toggleShowSidebar}>
						<Close class="text-white/50 transition-colors hover:text-white/75 md:size-6" />
					</button>
				</div>
				<img
					src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
					class="object-cover md:size-auto"
				/>
				<div class="flex flex-col leading-none md:gap-1 md:p-3">
					<h3 class="font-medium text-stone-100 md:text-base">Anya Forger</h3>
					<h5 class="text-stone-400 md:text-xs">Joined Date: Dec 25, 2023</h5>
				</div>
			</div>
		</>
	);
};
