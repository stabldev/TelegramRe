export type ChatProps = {
	id: number;
	username: string;
	image: string;
	content: string;
	time: string;
	status: "seen" | "send" | "sending";
};
