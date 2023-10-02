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
					timestamp="2023-09-25T15:38:51.162Z"
					new_message={false}
				/>	
			</div>
		</div>
	);
};