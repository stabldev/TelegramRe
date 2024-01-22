export type ChatMessage = {
	id: number;
	sender: number;
	reciever: number;
	message: string;
	is_read: boolean;
	date: string;
};