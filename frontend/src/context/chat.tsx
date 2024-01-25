import { Accessor, JSX, Setter, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";
import { WS_URL } from "~/config";
import { ChatMessage, ChatRoom } from "~/types/chat.types";
import { OnlineUser } from "~/types/user.types";

type ChatContext = {
	chatRooms: Accessor<ChatRoom[] | undefined>;
	setChatRooms: Setter<ChatRoom[] | undefined>;
	onlineUsers: Accessor<OnlineUser[] | undefined>;
	setOnlineUsers: Setter<OnlineUser[] | undefined>;
	socket: Accessor<WebSocket | undefined>;
};

const ChatContext = createContext<ChatContext>();

export function ChatProvider(props: { children?: JSX.Element }) {
	const [chatRooms, setChatRooms] = createSignal<ChatRoom[]>();
	const [onlineUsers, setOnlineUsers] = createSignal<OnlineUser[]>();
	const [socket, setSocket] = createSignal<WebSocket>();

	onMount(() => {
		setSocket(new WebSocket(WS_URL + `ws/chat/`));

		socket()!.onclose = function (e: CloseEvent) {
			console.log("Connection closed");
		};

		socket()!.onmessage = function (e: MessageEvent) {
			const data: {
				action: "online_users" | "message";
				message?: ChatMessage,
				online_user_list?: OnlineUser[];
			} = JSON.parse(e.data);

			if (data.action === "message") {
				// update sidebar
				setChatRooms((chatRooms) => {
					const updatedChatRoom = chatRooms?.map((room) => {
						if (room.id === data.message?.room) {
							return { ...room, message: data.message };
						}
						return room;
					});
					return updatedChatRoom;
				});
			} else if (data.action === "online_users") {
				setOnlineUsers(data.online_user_list);
			};
		};
	});

	const context_value: ChatContext = {
		chatRooms: chatRooms,
		setChatRooms: setChatRooms,
		onlineUsers: onlineUsers,
		setOnlineUsers: setOnlineUsers,
		socket: socket,
	};

	return <ChatContext.Provider value={context_value}>{props.children}</ChatContext.Provider>;
}

export function useChat() {
	return useContext(ChatContext)!;
}
