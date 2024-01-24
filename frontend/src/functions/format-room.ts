import { useAuth } from "~/context/auth";
import { ChatRoomType } from "~/types/chat.types";

export function formatChatRoom(chatRooms: ChatRoomType[]) {
    if (!chatRooms) return;
    const { user } = useAuth();
    const userId = user()?.id;

    const initialValue: ChatRoomType[] = [];

    return chatRooms.reduce((acumulator, chat) => {
        if (chat.type === "DM") {
            let newChat = {...chat};
            newChat.member = chat.member.filter((user) => user.id !== userId);
            acumulator.push(newChat);
            return acumulator;
        };
        return acumulator;
    }, initialValue);
};