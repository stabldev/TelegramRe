import { SearchHeader } from "./search-header";
import { For } from "solid-js";
import { useChat } from "~/context/chat";
import { ProfileItem } from "./profile-item";
import Pencil from "~/icons/pencil";

type Props = {
	toggleView: () => void;
	isLoading: boolean;
};

export const ChatBar = (props: Props) => {
	const { chatRooms } = useChat();

	return (
		<>
			<SearchHeader toggleView={props.toggleView} />
			<div class="overflow-y-scroll px-3 [scrollbar-width:_thin]">
				<For each={chatRooms()?.sort((a, b) => b.message.id - a.message.id)}>{(room) => <ProfileItem {...room} />}</For>
			</div>
			<button class="btn btn-primary btn-circle absolute bottom-3 right-3">
				<Pencil class="size-5 text-accent" />
			</button>
		</>
	);
};
