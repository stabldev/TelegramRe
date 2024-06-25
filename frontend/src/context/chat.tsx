import {
  Accessor,
  JSX,
  Setter,
  createContext,
  createSignal,
  useContext
} from "solid-js";
import { produce } from "solid-js/store";
import SocketActions from "~/endpoints/socket/socket-actions";
import { useWebSocket } from "~/hooks/useWebSocket";
import { setChatRooms } from "~/stores/chatStore";
import { WebSocketData } from "~/types/WebSocket";
import type { ChatRoom } from "~/types/chat";
import type { OnlineUser } from "~/types/user";

type ChatContextReturnType = {
  onlineUsers: Accessor<OnlineUser[] | undefined>;
  setOnlineUsers: Setter<OnlineUser[] | undefined>;
  activeRoom: Accessor<ChatRoom | undefined>;
  setActiveRoom: Setter<ChatRoom | undefined>;
  socket: Accessor<WebSocket | undefined>;
};

const ChatContext = createContext<ChatContextReturnType>();

export function ChatProvider(props: { children?: JSX.Element }) {
  const [onlineUsers, setOnlineUsers] = createSignal<OnlineUser[]>();
  const [activeRoom, setActiveRoom] = createSignal<ChatRoom>();

  const [socket] = useWebSocket(handleSocketMessage);

  function handleSocketMessage(data: WebSocketData) {
    switch (data.action) {
      case SocketActions.MESSAGE:
        setChatRooms(
          (room) => room.id === data.message?.room,
          produce((room) => {
            (room.message = data.message!),
              (room.unreads =
                room.id !== activeRoom()?.id ? room.unreads + 1 : 0);
          })
        );
        break;
      case SocketActions.ONLINE_USERS:
        setOnlineUsers(data.online_users_list);
        break;
      case SocketActions.EDIT_MESSAGE:
        setChatRooms(
          (chatRoom) =>
            chatRoom.id === data.message?.room &&
            chatRoom.message.id === data.message?.id,
          "message",
          data.message!
        );
        break;
      default:
        break;
    }
  }

  const context_value: ChatContextReturnType = {
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
