import { Component, For, createEffect, createResource, createSignal } from "solid-js";
import { SearchHeader } from "./search-header";
import Pencil from "~/icons/pencil";
import { ProfileItem } from "./profile-item";
import { API_URL } from "~/config";
import { InboxItem } from "~/types/inbox.types";
import { ChatRoomType } from "~/types/chat.types";
import { formatChatRoom } from "~/functions/format-room";

async function fetchInbox(): Promise<InboxItem[]> {
	const res = await fetch(`${API_URL}/inbox/`, {
		credentials: "include"
	});
	const data = await res.json();
	return data;
}

async function getChatRooms() {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/`, {
		credentials: "include"
	});
	const data = await res.json() as ChatRoomType[];
	return data;
};

const Sidebar: Component = () => {
	const [inbox] = createResource<InboxItem[]>(fetchInbox);
	const [chatRooms] = createResource<ChatRoomType[]>(getChatRooms);
	const [formattedChatRooms, setFormattedChatRooms] = createSignal<ChatRoomType[]>();

	createEffect(async () => {
		setFormattedChatRooms(
			formatChatRoom(chatRooms()!)
		);
	}, []);

	return (
		<div class="relative grid h-screen w-full grid-rows-[min-content_1fr] border-r border-black/50 bg-stone-900">
			<SearchHeader />
			<div class="overflow-y-scroll px-3 [scrollbar-width:_thin]">
				<For each={formattedChatRooms()}>{(room) => <ProfileItem {...room} />}</For>
			</div>
			<button class="absolute bottom-3 right-3 rounded-full bg-blue-500 p-4">
				<Pencil class="text-xl text-white" />
			</button>
		</div>
	);
};

export default Sidebar;
