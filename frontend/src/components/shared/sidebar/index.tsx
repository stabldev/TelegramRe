import { Component, For, Show, createEffect, createResource } from "solid-js";
import { SearchHeader } from "./search-header";
import Pencil from "~/icons/pencil";
import { ProfileItem } from "./profile-item";
import { API_URL } from "~/config";
import { formatChatRoom } from "~/functions/format-room";
import { ChatRoom } from "~/types/chat.types";
import { useChat } from "~/context/chat";
import { OnlineUser } from "~/types/user.types";

async function getChatRooms() {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/`, {
		credentials: "include"
	});
	const data = (await res.json()) as ChatRoom[];
	return data;
}

async function getOnlineUsers() {
	const res = await fetch(`${API_URL}/v1/chat/online-users/`, {
		credentials: "include"
	});
	const data = (await res.json()) as OnlineUser[];
	return data;
}

const Sidebar: Component = () => {
	const { chatRooms, setChatRooms, setOnlineUsers } = useChat();
	const [data] = createResource<ChatRoom[]>(getChatRooms);
	const [online_users] = createResource<OnlineUser[]>(getOnlineUsers);

	createEffect(async () => {
		setChatRooms(formatChatRoom(data()));
		setOnlineUsers(online_users());
	}, []);

	return (
		<div class="relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-black/50 bg-stone-900">
			<SearchHeader />
			<Show when={!data.loading}>
				<div class="overflow-y-scroll px-3 [scrollbar-width:_thin]">
					<For each={chatRooms()}>{(room) => <ProfileItem {...room} />}</For>
				</div>
			</Show>
			<button class="absolute bottom-3 right-3 rounded-full bg-blue-500 p-4">
				<Pencil class="text-xl text-white" />
			</button>
		</div>
	);
};

export default Sidebar;
