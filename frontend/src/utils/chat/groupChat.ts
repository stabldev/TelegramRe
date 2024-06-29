import type { ChatMember, ChatMessage } from "~/types/Chat";

/**
 * Format chat messages based on sender
 * example input:
 * => chat = [{user1: {...}}, user1: {...}, user2: {...}]
 * output be like:
 * => [[...user1_messages], [...user2_messages]]
 */
// TODO: format by date as well
export function groupChatBySender(chat?: ChatMessage[]) {
  if (!chat) return;

  const groupedChat: {
    sender: ChatMember;
    chats: ChatMessage[];
  }[] = [];
  // store previous data for comparing with new
  let prevSender: ChatMember | null = null;
  let prevChat: ChatMessage[] = [];

  chat.forEach((message) => {
    // check if current message sender is previously passed sender
    // ps: this won't run on first message
    if (message.sender.id === prevSender?.id) {
      // push current message to array with same sender
      prevChat.push(message);
    } else {
      // has prevSender but not same as current message.sender
      // push current chat array to main groupChat
      // ps: this wont run on first message
      if (prevSender !== null) {
        groupedChat.push({
          sender: prevSender,
          chats: prevChat
        });
      }
      // update states for next iteration
      prevSender = message.sender;
      prevChat = [message];
    }
  });
  // after iterations, the last message won't push to final array
  // last message will be saved on prevChat, but won't push until next iteration
  if (prevSender !== null) {
    // push last saved message to final array
    groupedChat.push({
      sender: prevSender,
      chats: prevChat
    });
  }

  return groupedChat;
}
