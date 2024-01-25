import { Component, Show, createEffect, createResource } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { ChatMessage, ChatRoom } from "~/types/chat.types";
import { API_URL } from "~/config";
import { useChat } from "~/context/chat";
import socket_actions from "~/lib/socket-actions";
import { OnlineUser } from "~/types/user.types";

async function fetchMessages({ room_id }: { room_id: string }) {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/${room_id}/`, { credentials: "include" });
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
			online_user_list?: OnlineUser[];
		} = JSON.parse(e.data);

		if (data.action === socket_actions.MESSAGE) {
			if (data.message?.room === activeRoom()?.id) {
				mutate((messages) => [...(messages || []), data.message!]);
			};

			setChatRooms((chatRooms) => {
				const updatedChatRoom = chatRooms?.map((room) => {
					if (room.id === data.message?.room) {
						return { ...room, message: data.message, unreads: room.unreads + 1 };
					}
					return room;
				});
				return updatedChatRoom;
			});
		} else if (data.action === socket_actions.ONLINE_USERS) {
			setOnlineUsers(data.online_user_list);
		} else if (data.action === "read_room") {
			setChatRooms((chatRooms) => {
				const updatedChatRoom = chatRooms?.map((room) => {
					if (room.id === activeRoom()?.id) {
						return { ...room, unreads: 0 };
					}
					return room;
				});
				return updatedChatRoom;
			});
		};
	};

	let chatAreaRef: HTMLDivElement;

	const handleAddMessage = (e: CustomEvent) => {
		const message = e.detail;
		socket()!.send(
			JSON.stringify({
				action: "message",
				message: message,
				room_id: activeRoom()?.room_id,
			})
		);
	};

	return (
		<div class="relative grid grid-rows-[min-content_1fr]">
			<ChatHeader />
			<Show when={!messages.loading}>
				<ChatArea
					chat={messages()!}
					ref={chatAreaRef!}
				/>
			</Show>
			<ChatInput onMessage={handleAddMessage} />
		</div>
	);
};

export default ChatScreen;
