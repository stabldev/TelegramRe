import { User } from "./user.types";

export type InboxItem = {
	id: number;
	sender: User;
	reciever: User;
	message: string;
	is_read: boolean;
	date: string;
};