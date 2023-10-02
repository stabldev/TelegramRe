import { For } from "solid-js";
import { FormatDate } from "../../functions/format_date";
import { ProfileItem, ProfileItemType } from "./ProfileItem";
import SearchHeader from "./SearchHeader";

const profile_mapping: ProfileItemType[] = [
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

export default function Sidebar() {
	return (
		<div class="bg-stone-900 w-full">
			<SearchHeader />
			<div>
				<For each={profile_mapping}>
					{(profile) => <ProfileItem {...profile} />}
				</For>
			</div>
		</div>
	);
};