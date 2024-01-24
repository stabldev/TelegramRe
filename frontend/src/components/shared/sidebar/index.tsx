import { Component, For, Show, createEffect, createResource, createSignal } from "solid-js";
import { SearchHeader } from "./search-header";
import Pencil from "~/icons/pencil";
import { ProfileItem } from "./profile-item";
import { API_URL } from "~/config";
import { formatChatRoom } from "~/functions/format-room";
import { ChatRoom } from "~/types/chat.types";
import { useChat } from "~/context/chat";

async function getChatRooms() {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/`, {
		credentials: "include"
	});
	const data = await res.json() as ChatRoom[];
	return data;
};

const Sidebar: Component = () => {
	const { chatRooms, setChatRooms } = useChat();
	const [data] = createResource<ChatRoom[]>(getChatRooms);

	createEffect(async () => {
		setChatRooms(
			formatChatRoom(data()!)
		);
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
