import { Component, Show, createResource } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { ChatMessage } from "~/types/chat.types";
import { API_URL, WS_URL } from "~/config";
import { useShared } from "~/context/shared";
import { useChat } from "~/context/chat";

async function readMessages(room_id: string) {
	await fetch(`${API_URL}/v1/chat/chat-rooms/${room_id}/read-all/`, {
		credentials: "include"
	});
};

async function fetchMessages({ room_id }: { room_id: string }) {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/${room_id}/`,
		{ credentials: "include" }
	);
	const data = await res.json() as ChatMessage[];
	if (!data.every((message) => message.is_read)) {
		await readMessages(room_id);
	};
	return data;
};

export const ChatScreen: Component = () => {
	const { activeRoom } = useShared();
	const { setChatRooms } = useChat();
	const [messages, { mutate }] = createResource(activeRoom, fetchMessages);

	const socket = new WebSocket(WS_URL + `ws/chat/`);

	socket.onclose = function(e: CloseEvent) {
		console.log("Connection closed");
	};

	socket.onmessage = function(e: MessageEvent) {
		const data: {
			action: "message",
			message: ChatMessage,
		} = JSON.parse(e.data);
		console.log(data);

		if (data.action === "message") {
			if (data.message.room === activeRoom()?.id) {
				mutate((messages) => [...messages || [], data.message]);
			};
			// update sidebar
			setChatRooms((chatRooms) => {
				const updatedChatRoom = chatRooms?.map((room) => {
					if (room.id === data.message.room) {
						return {...room, message: data.message};
					};
					return room;
				});
				return updatedChatRoom;
			});
		};
	};

	let chatAreaRef: HTMLDivElement;

	const handleAddMessage = (e: CustomEvent) => {
		const message = e.detail;
		socket.send(JSON.stringify({
			"message": message,
			"room_id": activeRoom()?.room_id,
		}));
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
