export type ChatProps = {
	id: number;
	name: string;
	image: string;
	content: string;
	time: string;
	status: "seen" | "send" | "sending";
};