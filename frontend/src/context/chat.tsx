import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";
import { ChatRoom } from "~/types/chat.types";
import { OnlineUser } from "~/types/user.types";

type ChatContext = {
    chatRooms: Accessor<ChatRoom[] | undefined>;
    setChatRooms: Setter<ChatRoom[] | undefined>;
    onlineUsers: Accessor<OnlineUser[] | undefined>;
    setOnlineUsers: Setter<OnlineUser[] | undefined>;
};

const ChatContext = createContext<ChatContext>();

export function ChatProvider(props: { children?: JSX.Element }) {
    const [chatRooms, setChatRooms] = createSignal<ChatRoom[]>();
    const [onlineUsers, setOnlineUsers] = createSignal<OnlineUser[]>();

    const context_value: ChatContext = {
        chatRooms: chatRooms,
        setChatRooms: setChatRooms,
        onlineUsers: onlineUsers,
        setOnlineUsers: setOnlineUsers,
    };

    return <ChatContext.Provider value={context_value}>{props.children}</ChatContext.Provider>;
};

export function useChat() {
    return useContext(ChatContext)!;
};