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
			<div class="overflow-y-scroll px-2 [scrollbar-width:_thin]">
				<For
					each={chatRooms()?.sort(
						(a, b) => b.message.id - a.message.id
					)}
				>
					{(room) => <ProfileItem {...room} />}
				</For>
			</div>
			<button class="group-hover:opacity-100 opacity-0 transition-opacity bg-primary size-14 rounded-full grid place-items-center absolute bottom-5 right-5">
				<Pencil class="size-6 text-accent" />
			</button>
		</>
	);
};
