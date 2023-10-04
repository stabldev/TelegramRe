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

	let chatAreaRef: HTMLDivElement;

	const handleAddMessage = (evt: CustomEvent) => {
		const message = evt.detail;

		const newChat: ChatProps = {
			id: Math.floor(Math.random() * 10000),
			name: "tokito",
			image: "https://avatars.githubusercontent.com/u/114811070?v=4",
			content: message,
			time: new Date().toISOString(),
			seen: false
		};

		setChat((prev) => [...prev, newChat]);
		// scroll chat area to bottom
		chatAreaRef.scrollTo({
			top: chatAreaRef.scrollHeight
		});
	};

	createEffect(() => {
		let matchedChat = Object.entries(chat_mapping).find(([key]) => key === params.username.slice(1));
		if (matchedChat) setChat(matchedChat[1]);
	}, [params.username])

	return (
		<div class="grid grid-rows-[min-content_1fr_min-content] h-screen">
			<ChatHeader />
			<ChatArea
				chat={chat()}
				ref={chatAreaRef!}
			/>
			<ChatInput onMessage={handleAddMessage} />
		</div>
	);
};

export default ChatScreen;