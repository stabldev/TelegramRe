import { useAuth } from "~/context/auth";
import type { ChatRoom } from "~/types/chat";

/**
 * Format chat rooms response
 * for chat rooms with type "DM":
 * current user is removed from its "member" array (to show only member details)
 * else:
 * TODO: handle chat rooms with type "GROUP"
 */
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
