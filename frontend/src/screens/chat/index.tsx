import { Component } from "solid-js";
import { ChatArea } from "./ChatArea";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

export const ChatScreen: Component = () => {
	return (
		<div class="grid grid-rows-[min-content_1fr_min-content] h-screen">
			<ChatHeader />
			<ChatArea />
			<ChatInput />
		</div>
	);
};

export default ChatScreen;