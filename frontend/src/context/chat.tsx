import {
	Accessor,
	JSX,
	Setter,
	createContext,
	createSignal,
	onMount,
	useContext
} from "solid-js";
import SocketActions from "~/connections/socket/socket-actions";
import SocketUrls from "~/connections/socket/socket-endpoints";
import type { ChatMessage, ChatRoom } from "~/types/chat";
import type { OnlineUser } from "~/types/user";

type ChatContextReturnType = {
	chatRooms: Accessor<ChatRoom[] | undefined>;
	setChatRooms: Setter<ChatRoom[] | undefined>;
	onlineUsers: Accessor<OnlineUser[] | undefined>;
	setOnlineUsers: Setter<OnlineUser[] | undefined>;
	activeRoom: Accessor<ChatRoom | undefined>;
	setActiveRoom: Setter<ChatRoom | undefined>;
	socket: Accessor<WebSocket | undefined>;
};

const ChatContext = createContext<ChatContextReturnType>();

export function ChatProvider(props: { children?: JSX.Element }) {
	const [chatRooms, setChatRooms] = createSignal<ChatRoom[]>();
	const [onlineUsers, setOnlineUsers] = createSignal<OnlineUser[]>();
	const [activeRoom, setActiveRoom] = createSignal<ChatRoom>();
	const [socket, setSocket] = createSignal<WebSocket>();

	// on context initialize: connect to socket
	onMount(() => {
		setSocket(new WebSocket(SocketUrls.CHAT));

		socket()!.onclose = function (e: CloseEvent) {
			console.log("Connection closed");
		};

		// handle socket incomming messages based on message type
		socket()!.onmessage = function (e: MessageEvent) {
			const data: {
				action: "online_users" | "message" | "edit_message";
				message?: ChatMessage;
				online_users_list?: OnlineUser[];
			} = JSON.parse(e.data);

			// handle sending messages
			if (data.action === SocketActions.MESSAGE) {
				// update sidebar
				setChatRooms((chatRooms) => {
					const updatedChatRoom = chatRooms?.map((room) => {
						if (room.id === data.message?.room) {
							return {
								...room,
								message: data.message!,
								unreads: room.unreads + 1
							};
						}
						return room;
					});
					return updatedChatRoom;
				});
			} else if (data.action === SocketActions.ONLINE_USERS) {
				// handle online users updates
				setOnlineUsers(data.online_users_list);
			} else if (data.action === SocketActions.EDIT_MESSAGE) {
				// handle edit message event
				setChatRooms((chatRooms) =>
					chatRooms?.map((room) =>
						room.id === data.message?.room &&
						room.message.id === data.message.id
							? { ...room, message: data.message }
							: room
					)
				);
			}
		};
	});

	const context_value: ChatContextReturnType = {
		chatRooms: chatRooms,
		setChatRooms: setChatRooms,
		onlineUsers: onlineUsers,
		setOnlineUsers: setOnlineUsers,
		activeRoom: activeRoom,
		setActiveRoom: setActiveRoom,
		socket: socket
	};

	return (
		<ChatContext.Provider value={context_value}>
			{props.children}
		</ChatContext.Provider>
	);
}

export function useChat() {
	return useContext(ChatContext)!;
}
