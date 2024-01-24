export type ChatMessage = {
	id: number;
	room: number;
	sender: number;
	content: string;
	is_read: boolean;
	timestamp: string;
};

export type ChatRoom = {
	id: number;
	room_id: string;
	type: string;
	name: string | null;
	unreads: number;
	message: ChatMessage;
	member: ChatMember[];
};

export type ChatMember = {
	id: number;
	username: string;
	full_name: string;
	is_verified: boolean;
	avatar: string;
};