import { Component, Show, createEffect, createResource, createSignal } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { scrollToBottom } from "~/functions/scroll-to-bottom";
import { ChatMessage } from "~/types/chat.types";
import { API_URL, WS_URL } from "~/config";
import { useShared } from "~/context/shared";
import { Member } from "~/types/user.types";

async function fetchMessages(user: Member) {
	const res = await fetch(`${API_URL}/messages/${user.username}/`,
		{ credentials: "include" }
	);
	const data = await res.json() as ChatMessage[];
	return data;
};

export const ChatScreen: Component = () => {
	const { activeRoom } = useShared();
	const [messages] = createResource(activeRoom()?.member[0], fetchMessages);

	const socket = new WebSocket(WS_URL + `ws/chat/`);

	socket.onclose = function(e: CloseEvent) {
		console.log("Connection closed");
	};

	socket.onmessage = function(e: MessageEvent) {
		const data = JSON.parse(e.data);
		console.log(data);
	};

	let chatAreaRef: HTMLDivElement;

	const handleAddMessage = (e: CustomEvent) => {
		const message = e.detail;
		socket.send(JSON.stringify({
			"message": message,
			"room_id": "T8MPvDQfcPkirhGogsvXUY",
		}));

		// scroll chat area to bottom
		requestAnimationFrame(() => {
			scrollToBottom(chatAreaRef, { behavior: "auto" });
		});
	};

	createEffect(() => {
		// scroll chat area to bottom
		requestAnimationFrame(() => {
			scrollToBottom(chatAreaRef, { behavior: "auto" });
		});
	});

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
