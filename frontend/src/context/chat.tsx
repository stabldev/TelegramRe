import { JSX, createContext, useContext } from "solid-js";
import { produce } from "solid-js/store";
import SocketActions from "~/endpoints/socket/socket-actions";
import { useWebSocket } from "~/hooks/useWebSocket";
import { activeRoom, setChatRooms } from "~/stores/chatStore";
import { setOnlineUsers } from "~/stores/userStore";
import { WebSocketData } from "~/types/WebSocket";

type ChatContextType = [ReturnType<typeof useWebSocket>[0]];

const ChatContext = createContext<ChatContextType>();

export function ChatProvider(props: { children?: JSX.Element }) {
  const [socket] = useWebSocket(handleSocketMessage);

  function handleSocketMessage(data: WebSocketData) {
    switch (data.action) {
      case SocketActions.MESSAGE:
        setChatRooms(
          (room) => room.id === data.message?.room,
          produce((room) => {
            (room.message = data.message!),
              (room.unreads = room.id !== activeRoom.id ? room.unreads + 1 : 0);
          })
        );
        break;
      case SocketActions.ONLINE_USERS:
        setOnlineUsers(data.online_users_list ?? []);
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

  const contextValue: ChatContextType = [socket];

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext)!;
}
