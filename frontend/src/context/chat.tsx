import { Accessor, JSX, Setter, createContext, createSignal, useContext } from "solid-js";
import { ChatRoom } from "~/types/chat.types";

type ChatContext = {
    chatRooms: Accessor<ChatRoom[] | undefined>;
    setChatRooms: Setter<ChatRoom[] | undefined>;
};

const ChatContext = createContext<ChatContext>();

export function ChatProvider(props: { children?: JSX.Element }) {
    const [chatRooms, setChatRooms] = createSignal<ChatRoom[]>();

    const context_value: ChatContext = {
        chatRooms: chatRooms,
        setChatRooms: setChatRooms,
    };

    return <ChatContext.Provider value={context_value}>{props.children}</ChatContext.Provider>;
};

export function useChat() {
    return useContext(ChatContext)!;
};