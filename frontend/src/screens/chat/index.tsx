import { Component, createEffect, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { ChatArea } from "./ChatArea";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { chat_mapping } from "../../data/mock/chat_messages";
import { ChatProps } from "../../types/Chat";

export const ChatScreen: Component = () => {
	const params = useParams<{ username: string; }>();
	const [chat, setChat] = createSignal<ChatProps[]>([]);

	createEffect(() => {
		let matchedChat = Object.entries(chat_mapping).find(([key]) => key === params.username.slice(1));
		if (matchedChat) setChat(matchedChat[1]);
	}, [params.username])

	return (
		<div class="grid grid-rows-[min-content_1fr_min-content] h-screen">
			<ChatHeader />
			<ChatArea chat={chat()} />
			<ChatInput />
		</div>
	);
};

export default ChatScreen;