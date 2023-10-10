import { ChatProps } from "../types/Chat";

type SenderType = {
	username: string;
	image: string;
};

export function groupChatBySender(chat: ChatProps[]) {
	const groupedChat: {
		sender: SenderType;
		chats: ChatProps[];
	}[] = [];
	// store previous data for comparing with new
	let prevSender: SenderType | null = null;
	let prevChat: ChatProps[] = [];

	chat.forEach((message) => {
		if (message.username === prevSender?.username) {
			prevChat.push(message);
		} else {
			if (prevSender !== null) {
				groupedChat.push({
					sender: {
						username: prevSender.username,
						image: prevSender.image
					},
					chats: prevChat
				});
			}

			prevSender = {
				username: message.username,
				image: message.image
			};
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
