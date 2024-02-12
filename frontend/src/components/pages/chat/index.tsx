import { Component, Show, createResource } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { ChatMessage } from "~/types/chat.types";
import { useChat } from "~/context/chat";
import { OnlineUser } from "~/types/user.types";
import SocketActions from "~/connections/socket/socket-actions";
import ApiEndpoints from "~/connections/api/api-endpoints";

async function fetchMessages({ room_id }: { room_id: string }) {
	const url = ApiEndpoints.chat.CHAT_ROOMS + room_id + "/";
	const res = await fetch(url, { credentials: "include" });
	const data = (await res.json()) as ChatMessage[];
	return data;
}

export const ChatScreen: Component = () => {
	const { socket, activeRoom, setChatRooms, setOnlineUsers } = useChat();
	const [messages, { mutate }] = createResource(activeRoom, fetchMessages);

	socket()!.onmessage = function (e: MessageEvent) {
		const data: {
			action: "message" | "online_users" | "read_room";
			message?: ChatMessage;
			online_users_list?: OnlineUser[];
		} = JSON.parse(e.data);

		if (data.action === SocketActions.MESSAGE) {
			if (data.message?.room === activeRoom()?.id) {
				mutate((messages) => [...(messages || []), data.message!]);
			}
			setChatRooms((chatRooms) =>
				chatRooms?.map((room) =>
					room.id === data.message?.room
						? {
								...room,
								message: data.message,
								unreads: room.id !== activeRoom()?.id ? room.unreads + 1 : 0
							}
						: room
				)
			);
		} else if (data.action === SocketActions.ONLINE_USERS) {
			setOnlineUsers(data.online_users_list);
		} else if (data.action === SocketActions.READ_ROOM) {
			setChatRooms((chatRooms) => chatRooms?.map((room) => (room.id === activeRoom()?.id ? { ...room, unreads: 0 } : room)));
		} else if (data.action === SocketActions.READ_MESSAGE) {
			if (data.message?.room !== activeRoom()?.room_id) {
				mutate((messages) => messages?.map((message) => (message.id === data.message?.id ? data.message : message)));
			}

			setChatRooms((chatRooms) => chatRooms?.map((room) => (room.id === data.message?.room ? { ...room, message: data.message!, unreads: 0 } : room)));
		}
	};

	let chatAreaRef: HTMLDivElement;

	return (
		<div class="relative grid grid-rows-[min-content_1fr]">
			<ChatHeader />
			<Show when={!messages.loading}>
				<ChatArea
					chat={messages()!}
					ref={chatAreaRef!}
				/>
			</Show>
			<ChatInput />
		</div>
	);
};

export default ChatScreen;
