import {
	Component,
	Show,
	createEffect,
	createResource,
	createSignal
} from "solid-js";
import { formatChatRoom } from "~/functions/chat/format-room";
import { useChat } from "~/context/chat";
import type { ChatRoom } from "~/types/chat";
import type { OnlineUser } from "~/types/user";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import ChatBar from "./chat-bar";
import SettingsBar from "./settings-bar";

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

	createEffect(() => {
		setChatRooms(formatChatRoom(data()));
		setOnlineUsers(online_users());
	});

	return (
		<div class="group relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-neutral-300 bg-base-200">
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
