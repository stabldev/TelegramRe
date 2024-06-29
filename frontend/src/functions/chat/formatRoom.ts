import { useAuth } from "~/context/auth";
import type { ChatRoom } from "~/types/Chat";
import { isDmChat } from "~/utils/typeGuards";

/**
 * Format chat rooms response
 * for chat rooms with type "DM":
 * current user is removed from its "member" array (to show only member details)
 */

export function formatChatRoom(chatRooms: ChatRoom[] | undefined) {
  if (!chatRooms) return;
  const { user } = useAuth();
  const userId = user()?.id;

  const initialValue: ChatRoom[] = [];

  return chatRooms.reduce((acumulator, room) => {
    if (isDmChat(room)) {
      const newRoom = { ...room };
      newRoom.members = room.members.filter((user) => user.id !== userId);
      acumulator.push(newRoom);
      return acumulator;
    }
    acumulator.push(room);
    return acumulator;
  }, initialValue);
}
