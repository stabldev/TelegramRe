export type User = {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	avatar: string | null;
	bio: string;
	is_verified: boolean;
	last_login: string;
	date_joined: string;
};