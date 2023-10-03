import { Component, For } from "solid-js";
import { FormatDate } from "../../functions/format_date";
import { ProfileItem } from "./ProfileItem";
import { SearchHeader } from "./SearchHeader";
import Pencil from "../../assets/icons/Pencil";
import { ProfileItemProps } from "../../types/ProfileItem";

const profile_mapping: ProfileItemProps[] = [
	{
		name: "Anya Forger",
		username: "anya-forger",
		image: "https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg",
		message: "Hi wassup! I've something to tell you, so please reply when you're free",
		timestamp: "2023-10-02T05:21:26Z",
		new_message: false
	},
	{
		name: "Toshinou Kyouko",
		username: "kyouko",
		image: "https://pbs.twimg.com/media/D2v3DBuXQAAMFIb.jpg",
		message: "Here is my gift for your birthday <3",
		timestamp: "2023-10-01T05:21:26Z",
		new_message: false
	}
];

const Sidebar: Component = () => {
	return (
		<div class="bg-stone-900 w-full h-screen relative grid grid-rows-[min-content_1fr_min-content] border-r-[0.1vw] border-black/50">
			<SearchHeader />
			<div class="overflow-y-scroll [scrollbar-width:_thin]">
				<For each={profile_mapping}>
					{(profile) => <ProfileItem {...profile} />}
				</For>
			</div>
			<button class="absolute right-[1vw] bottom-[1vw] p-[1.25vw] rounded-full bg-blue-500">
				<Pencil class="text-white text-[1.5vw]" />
			</button>
		</div>
	);
};

export default Sidebar;