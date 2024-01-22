import { Component, Show, createEffect, createResource, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { scrollToBottom } from "~/functions/scroll-to-bottom";
import { useAuth } from "~/context/auth";
import { ChatMessage, ChatProps } from "~/types/chat.types";
import { API_URL } from "~/config";
import { useShared } from "~/context/shared";
import { User } from "~/types/user.types";

async function fetchMessages(user: User) {
	const res = await fetch(`${API_URL}/messages/${user.username}/`,
		{ credentials: "include" }
	);
	const data = await res.json() as ChatMessage[];
	return data;
};

export const ChatScreen: Component = () => {
	const { activeChatUser } = useShared();
	const [chat, setChat] = createSignal<ChatProps[]>([]);
	const { user } = useAuth();
	const [messages] = createResource(activeChatUser, fetchMessages);

	let chatAreaRef: HTMLDivElement;

	const handleAddMessage = (e: CustomEvent) => {
		const message = e.detail;

		const newChat: ChatProps = {
			id: Math.floor(Math.random() * 10000),
			username: user()!.username,
			image: "https://avatars.githubusercontent.com/u/114811070?v=4",
			content: message,
			time: new Date().toISOString(),
			status: "sending"
		};

		setChat((prev) => [...prev, newChat]);
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
