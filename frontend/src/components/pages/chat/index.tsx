import { Component, Show, createEffect, createResource } from "solid-js";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatArea } from "./chat-area";
import { ChatMessage } from "~/types/chat.types";
import { useChat } from "~/context/chat";
import { OnlineUser } from "~/types/user.types";
import SocketActions from "~/connections/socket/socket-actions";
import ApiEndpoints from "~/connections/api/api-endpoints";
import { makeCache, makeAbortable } from "@solid-primitives/resource";
import { useParams } from "@solidjs/router";
import { scrollToBottom } from "~/functions/scroll-to-bottom";

export const ChatScreen: Component = () => {
	const { socket, activeRoom, setChatRooms, setOnlineUsers } = useChat();
	const params = useParams<{ username: string }>();

	const [cachedFetcher, invalidate] = makeCache(fetchMessages, { storage: localStorage });
	const [signal] = makeAbortable({ timeout: 10000 });
	const [messages, { mutate }] = createResource(activeRoom, cachedFetcher);

	async function fetchMessages({ room_id }: { room_id: string }) {
		const url = ApiEndpoints.chat.CHAT_ROOMS + room_id + "/";
		const res = await fetch(url, {
			signal: signal(),
			credentials: "include"
		});
		return (await res.json()) as ChatMessage[];
	}

	socket()!.onmessage = function (e: MessageEvent) {
		const data: {
			action: "message" | "online_users" | "read_room" | "edit_message";
			message?: ChatMessage;
			online_users_list?: OnlineUser[];
		} = JSON.parse(e.data);

		if (data.action === SocketActions.MESSAGE) {
			if (data.message?.room === activeRoom()?.id) {
				mutate((messages) => [...(messages || []), data.message!]);
			}
			setChatRooms((chatRooms) =>
				chatRooms?.map((room) =>
					room.id === data.message?.room
						? {
								...room,
								message: data.message,
								unreads:
									room.id !== activeRoom()?.id
										? room.unreads + 1
										: 0
							}
						: room
				)
			);
		} else if (data.action === SocketActions.ONLINE_USERS) {
			setOnlineUsers(data.online_users_list);
		} else if (data.action === SocketActions.READ_ROOM) {
			setChatRooms((chatRooms) =>
				chatRooms?.map((room) =>
					room.id === activeRoom()?.id
						? { ...room, unreads: 0 }
						: room
				)
			);
		} else if (data.action === SocketActions.READ_MESSAGE) {
			if (data.message?.room !== activeRoom()?.room_id) {
				mutate((messages) =>
					messages?.map((message) =>
						message.id === data.message?.id
							? data.message
							: message
					)
				);
			}

			setChatRooms((chatRooms) =>
				chatRooms?.map((room) =>
					room.id === data.message?.room
						? { ...room, message: data.message!, unreads: 0 }
						: room
				)
			);
		} else if (data.action === SocketActions.EDIT_MESSAGE) {
			if (data.message?.room === activeRoom()?.id) {
				let room_id = activeRoom()?.room_id ?? "";
				invalidate({ room_id: room_id });
				mutate((messages) =>
					messages?.map((message) =>
						message.id === data.message?.id
							? data.message
							: message
					)
				);
			}

			setChatRooms((chatRooms) =>
				chatRooms?.map((room) =>
					room.id === data.message?.room &&
					room.message.id === data.message.id
						? { ...room, message: data.message }
						: room
				)
			);
		}

		requestAnimationFrame(() => {
			scrollToBottom(chatAreaRef, { behavior: "smooth" });
		});
	};

	let chatAreaRef: HTMLDivElement;

	createEffect(() => {
		console.log(params.username);
		requestAnimationFrame(() => {
			scrollToBottom(chatAreaRef, { behavior: "smooth" });
		});
	});

	return (
		<div class="relative grid h-screen grid-rows-[min-content_auto_min-content]">
			<ChatHeader />
			<Show when={!messages.loading}>
				<ChatArea
					chat={messages()!}
					ref={chatAreaRef!}
				/>
			</Show>
			<ChatInput />
		</div>
	);
};

export default ChatScreen;
