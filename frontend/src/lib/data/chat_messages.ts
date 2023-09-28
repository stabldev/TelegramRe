export const chat_mapping: {
	[key: string]: Array<{
		id: number;
		sender: string;
		message: string;
		time: string;
		seen: boolean;
	}>;
} = {
	'anya-forger': [
		{
			id: 1,
			sender: 'tokito',
			message: 'Hi wassup!',
			time: '2023-09-25T15:35:51.162Z',
			seen: true
		},
		{
			id: 2,
			sender: 'tokito',
			message: 'Its me Tokito',
			time: '2023-09-25T15:35:51.162Z',
			seen: true
		},
		{
			id: 3,
			sender: 'anya-forger',
			message: "Hey! I'm good",
			time: '2023-09-25T15:38:51.162Z',
			seen: true
		},
		{
			id: 4,
			sender: 'anya-forger',
			message: 'So wassup',
			time: '2023-09-25T15:38:51.162Z',
			seen: true
		},
		{
			id: 5,
			sender: 'anya-forger',
			message: "How's life?",
			time: '2023-09-25T15:38:51.162Z',
			seen: true
		},
		{
			id: 6,
			sender: 'tokito',
			message: 'Yup! but I miss you :)',
			time: '2023-09-25T15:35:51.162Z',
			seen: false
		}
	],
	kyouko: [
		{
			id: 7,
			sender: 'kyouko',
			message: 'Hi',
			time: '2023-09-25T15:38:51.162Z',
			seen: true
		},
		{
			id: 8,
			sender: 'tokito',
			message: 'Hey Kyouko!',
			time: '2023-09-25T15:35:51.162Z',
			seen: true
		},
		{
			id: 9,
			sender: 'tokito',
			message: 'Sorry for what happened yesterday',
			time: '2023-09-25T15:35:51.162Z',
			seen: true
		},
		{
			id: 10,
			sender: 'kyouko',
			message: 'Yea no worries, could you call me please?',
			time: '2023-09-25T15:38:51.162Z',
			seen: true
		},
		{
			id: 11,
			sender: 'tokito',
			message: 'Okay sure',
			time: '2023-09-25T15:35:51.162Z',
			seen: false
		}
	]
};
