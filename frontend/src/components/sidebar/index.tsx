import { FormatDate } from "../../functions/format_date";
import ProfileItem from "./ProfileItem";
import SearchHeader from "./SearchHeader";

export default function Sidebar() {
	return (
		<div class="bg-stone-900 w-full">
			<SearchHeader />
			<div>
				<ProfileItem
					image="https://pm1.aminoapps.com/8063/ff1db42bbc3a7bc249022b37125da8fa3b1e2d4br1-512-512v2_hq.jpg"
					name="Anya Forger"
					username="anya-forger"
					message="Hi wassup! I've something to tell you, so please reply when you're free"
					timestamp={String(new FormatDate("2023-10-02T05:21:26Z").format_to_relative_time)}
					new_message={false}
				/>	
			</div>
		</div>
	);
};