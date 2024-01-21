export type ChatProps = {
	id: number;
	username: string;
	image: string;
	content: string;
	time: string;
	status: "seen" | "send" | "sending";
};

export type ChatMessage = {
	id: number;
	sender: number;
	reciever: number;
	message: string;
	is_read: boolean;
	date: string;
}