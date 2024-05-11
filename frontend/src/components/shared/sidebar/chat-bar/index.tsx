import SearchHeader from "./search-header";
import { For } from "solid-js";
import { useChat } from "~/context/chat";
import ProfileItem from "./profile-item";
import Pencil from "~/icons/pencil";

type Props = {
	toggleView: () => void;
	isLoading: boolean;
};

const ChatBar = (props: Props) => {
	const { chatRooms } = useChat();

	return (
		<>
			<SearchHeader toggleView={props.toggleView} />
			<div class="overflow-y-scroll px-2 [scrollbar-width:_thin]">
				<For
					each={chatRooms()?.sort(
						(a, b) => b.message.id - a.message.id
					)}
				>
					{(room) => <ProfileItem {...room} />}
				</For>
			</div>
			<button class="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100">
				<Pencil class="size-6 text-accent" />
			</button>
		</>
	);
};

export default ChatBar;
