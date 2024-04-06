import {
	Component,
	Show,
	createEffect,
	createResource,
	createSignal
} from "solid-js";
import { formatChatRoom } from "~/functions/format-room";
import { ChatRoom } from "~/types/chat.types";
import { useChat } from "~/context/chat";
import { OnlineUser } from "~/types/user.types";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { ChatBar } from "./chat-bar";
import { SettingsBar } from "./settings-bar";

async function getChatRooms() {
	const res = await fetch(ApiEndpoints.chat.CHAT_ROOMS, {
		credentials: "include"
	});
	const data = (await res.json()) as ChatRoom[];
	return data;
}

async function getOnlineUsers() {
	const res = await fetch(ApiEndpoints.chat.ONLINE_USERS, {
		credentials: "include"
	});
	const data = (await res.json()) as OnlineUser[];
	console.log(data);
	return data;
}

const Sidebar: Component = () => {
	const { setChatRooms, setOnlineUsers } = useChat();
	const [data] = createResource<ChatRoom[]>(getChatRooms);
	const [online_users] = createResource<OnlineUser[]>(getOnlineUsers);
	const [isChatBarOpen, setIsChatBarOpen] = createSignal(true);

	const toggleView = () => setIsChatBarOpen((prev) => !prev);

	createEffect(async () => {
		setChatRooms(formatChatRoom(data()));
		setOnlineUsers(online_users());
	}, );

	return (
		<div class="relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-black/50 bg-base-300">
			<Show
				when={isChatBarOpen()}
				fallback={<SettingsBar toggleView={toggleView} />}
			>
				<ChatBar
					isLoading={data.loading}
					toggleView={toggleView}
				/>
			</Show>
		</div>
	);
};

export default Sidebar;
