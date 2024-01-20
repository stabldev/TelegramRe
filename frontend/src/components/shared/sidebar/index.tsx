import { Component, For } from "solid-js";
import { ProfileItemProps } from "../../../types/profile-item";
import { SearchHeader } from "./search-header";
import Pencil from "~/icons/pencil";
import { ProfileItem } from "./profile-item";

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
		message: "Goodbye, Tokito! Have a great day!",
		timestamp: "2023-10-01T05:21:26Z",
		new_message: false
	}
];

const Sidebar: Component = () => {
	return (
		<div class="relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-black/50 bg-stone-900">
			<SearchHeader />
			<div class="overflow-y-scroll px-3 [scrollbar-width:_thin]">
				<For each={profile_mapping}>{(profile) => <ProfileItem {...profile} />}</For>
			</div>
			<button class="absolute bottom-3 right-3 rounded-full bg-blue-500 p-4">
				<Pencil class="text-xl text-white" />
			</button>
		</div>
	);
};

export default Sidebar;
