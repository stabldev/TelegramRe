import { Member, User } from "./user.types";

export type ChatMessage = {
	id: number;
	sender: number;
	reciever: number;
	message: string;
	is_read: boolean;
	date: string;
};

export type ChatMessageType = {
	id: number;
	room: number;
	user: number;
	content: string;
	is_read: boolean;
	timestamp: string;
};

export type ChatRoomType = {
	room_id: string;
	type: string;
	name: string | null;
	message: ChatMessageType;
	member: Member[];
};