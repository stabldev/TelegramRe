import {
  Accessor,
  JSX,
  Setter,
  createContext,
  createSignal,
  useContext
} from "solid-js";
import SocketActions from "~/endpoints/socket/socket-actions";
import { useWebSocket } from "~/hooks/useWebSocket";
import { WebSocketData } from "~/types/WebSocket";
import type { ChatRoom } from "~/types/chat";
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

  const handleSocketMessage = (data: WebSocketData) => {
    if (data.action === SocketActions.MESSAGE) {
      setChatRooms(
        (chatRooms) =>
          chatRooms &&
          chatRooms.map((room) =>
            room.id === data.message?.room
              ? {
                  ...room,
                  message: data.message!,
                  unreads: room.unreads + 1
                }
              : room
          )
      );
    } else if (data.action === SocketActions.ONLINE_USERS) {
      setOnlineUsers(data.online_users_list);
    } else if (data.action === SocketActions.EDIT_MESSAGE) {
      setChatRooms(
        (chatRooms) =>
          chatRooms &&
          chatRooms.map((room) =>
            data.message &&
            room.id === data.message.room &&
            room.message.id === data.message.id
              ? { ...room, message: data.message }
              : room
          )
      );
    }
  };

  const { socket } = useWebSocket(handleSocketMessage);

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
