import { ChatArea } from "./ChatArea";
import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";

export default function ChatScreen() {
	return (
		<div class="grid grid-rows-[min-content_1fr_min-content] h-screen">
			<ChatHeader />
			<ChatArea />
			<ChatInput />
		</div>
	);
};