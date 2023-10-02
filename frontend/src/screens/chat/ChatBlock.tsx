import Tick from "../../assets/icons/Tick";
import { FormatDate } from "../../functions/format_date";

export const ChatBlock = () => {
	const formatedDate = new FormatDate("2023-10-02T05:21:26Z").format_to_relative_time;

	return (
		<div class="flex items-end gap-[0.65vw]">
			<img
				src="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
				alt="anya-forger"
				class="w-[2.15vw] rounded-full"
			/>
			<div>
				<div
					class="bg-blue-500 text-white pl-[0.9vw] pr-[0.5vw] h-[2.15vw] flex gap-[0.5vw]"
					style={{ "border-radius": "1vw 1vw 1vw 0.35vw" }}
				>
					<span class="self-center text-[0.95vw]">Still not awake?</span>
					<span class="self-end pb-[0.15vw] text-[0.75vw] uppercase text-white/80 select-none">{formatedDate}</span>
					<Tick
						variant="double"
						class="self-end pb-[0.2vw] text-white text-[1.35vw]"
					/>
				</div>
			</div>
		</div>
	);
};