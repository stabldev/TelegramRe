import { Component, Show, createResource } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { ChatMessage } from "~/types/chat.types";
import { API_URL, WS_URL } from "~/config";
import { useShared } from "~/context/shared";
import { useChat } from "~/context/chat";

async function fetchMessages(room_id: string) {
	const res = await fetch(`${API_URL}/v1/chat/chat-rooms/${room_id}/`,
		{ credentials: "include" }
	);
	const data = await res.json() as ChatMessage[];
	return data;
};

export const ChatScreen: Component = () => {
	const { activeRoom } = useShared();
	const { setChatRooms } = useChat();
	const [messages, { mutate }] = createResource(activeRoom()?.room_id, fetchMessages);

	const socket = new WebSocket(WS_URL + `ws/chat/`);

	socket.onclose = function(e: CloseEvent) {
		console.log("Connection closed");
	};

	socket.onmessage = function(e: MessageEvent) {
		const message: ChatMessage = JSON.parse(e.data);
		mutate((messages) => [...messages || [], message]);
		// update sidebar
		setChatRooms((chatRooms) => {
			const updatedChatRoom = chatRooms?.map((room) => {
				if (room.id === message.room) {
					return {...room, message: message};
				};
				return room;
			});
			return updatedChatRoom;
		});
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
