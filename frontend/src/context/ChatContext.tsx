import { JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore, produce } from "solid-js/store";
import SocketActions from "~/endpoints/socket/socket-actions";
import { useWebSocket } from "~/hooks/useWebSocket";
import { WebSocketData } from "~/types/WebSocket";
import { ChatMessage, ChatRoom } from "~/types/Chat";
import { OnlineUser } from "~/types/User";

type StateType = {
  chatRooms: ChatRoom[];
  activeRoom: ChatRoom;
  onlineUsers: OnlineUser[];
  messages: ChatMessage[];
};

type ChatContextType = {
  chatStore: StateType;
  setChatStore: SetStoreFunction<StateType>;
  chatSocket: ReturnType<typeof useWebSocket>[0];
};

const ChatContext = createContext<ChatContextType>();

export function ChatProvider(props: { children?: JSX.Element }) {
  const [socket] = useWebSocket(handleSocketMessage);
  const [state, setState] = createStore<StateType>({
    chatRooms: [],
    activeRoom: {} as ChatRoom,
    onlineUsers: [],
    messages: []
  });

  function handleSocketMessage(data: WebSocketData) {
    // TODO: remove this console after stable all stable socket logics
    console.log(data);
    switch (data.action) {
      case SocketActions.MESSAGE:
        if (data.message && data.message.room === state.activeRoom.id) {
          setState("messages", state.messages.length, data.message);
        }

        setState(
          "chatRooms",
          (room) => room.id === data.message?.room,
          produce((room) => {
            (room.message = data.message as ChatMessage),
              (room.unreads =
                room.id !== state.activeRoom.id ? room.unreads + 1 : 0);
          })
        );
        break;
      case SocketActions.ONLINE_USERS:
        setState("onlineUsers", data.online_users_list ?? []);
        break;
      case SocketActions.EDIT_MESSAGE:
        if (data.message && data.message.room === state.activeRoom.id) {
          setState(
            "messages",
            (message) => message.id === data.message?.id,
            produce((message) => {
              (message.content = data.message?.content ?? message.content),
                (message.edited = true);
            })
          );
        }

        setState(
          "chatRooms",
          (chatRoom) =>
            chatRoom.id === data.message?.room &&
            chatRoom.message.id === data.message?.id,
          "message",
          data.message as ChatMessage
        );
        break;
      case SocketActions.READ_MESSAGE:
        if (data.message && data.message.room === state.activeRoom.id) {
          setState(
            "messages",
            (message) => message.id === data.message?.id,
            "is_read",
            true
          );
        }

        setState(
          "chatRooms",
          (room) => room.id === data.message?.room,
          "unreads",
          // TODO: return unreads with messages references
          0
        );
        break;
      default:
        break;
    }
  }

  const contextValue: ChatContextType = {
    chatStore: state,
    setChatStore: setState,
    chatSocket: socket
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext)!;
}
