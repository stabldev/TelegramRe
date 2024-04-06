import { useAuth } from "~/context/auth";
import { ChatRoom } from "~/types/chat.types";

export function formatChatRoom(chatRooms: ChatRoom[] | undefined) {
	if (!chatRooms) return;
	const { user } = useAuth();
	const userId = user()?.id;

	const initialValue: ChatRoom[] = [];

	return chatRooms.reduce((acumulator, chat) => {
		if (chat.type === "DM") {
			const newChat = { ...chat };
			newChat.member = chat.member.filter((user) => user.id !== userId);
			acumulator.push(newChat);
			return acumulator;
		}
		return acumulator;
	}, initialValue);
}
