import { ChatType } from "../data/mock/chat_messages";

type SenderType = {
	name: string;
	image: string;
};

export function groupChatBySender(chat: ChatType[]) {
	const groupedChat: {
		sender: SenderType;
		chats: ChatType[];
	}[] = [];
	// store previous data for comparing with new
	let prevSender: SenderType | null = null;
	let prevChat: ChatType[] = [];

	chat.forEach((message) => {
		if (message.name === prevSender?.name) {
			prevChat.push(message);
		} else {
			if (prevSender !== null) {
				groupedChat.push({
					sender: {
						name: prevSender.name,
						image: prevSender.image
					},
					chats: prevChat
				});
			};

			prevSender = {
				name: message.name,
				image: message.image
			};
			prevChat = [message];
		};
	});

	if (prevSender !== null) {
		groupedChat.push({
			sender: prevSender,
			chats: prevChat
		});
	};

	return groupedChat;
};