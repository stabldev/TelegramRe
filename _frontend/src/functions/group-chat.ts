import { ChatMessage } from "../types/chat.types";

export function groupChatBySender(chat?: ChatMessage[]) {
	const groupedChat: {
		sender: number;
		chats: ChatMessage[];
	}[] = [];
	// store previous data for comparing with new
	let prevSender: number | null = null;
	let prevChat: ChatMessage[] = [];

	chat?.forEach((message) => {
		if (message.sender === prevSender) {
			prevChat.push(message);
		} else {
			if (prevSender !== null) {
				groupedChat.push({
					sender: prevSender,
					chats: prevChat
				});
			}

			prevSender = message.sender;
			prevChat = [message];
		}
	});

	if (prevSender !== null) {
		groupedChat.push({
			sender: prevSender,
			chats: prevChat
		});
	}

	return groupedChat;
}
