import { createEffect, createSignal } from "solid-js";
import Avatar from "~/components/ui/Avatar";
import { useChat } from "~/context/chat";
import { GroupChatRoom } from "~/types/Chat";

const GroupProfile = (props: GroupChatRoom) => {
  const { chatStore } = useChat();
  const [onlineMembers, setOnlineMembers] = createSignal(0);

  createEffect(() => {
    const room = chatStore.activeRoom as GroupChatRoom;
    setOnlineMembers(
      room?.members.filter((memId) =>
        chatStore.onlineUsers.find((obj) => obj.user === memId)
      ).length ?? 0
    );
  });

  return (
    <>
      <div class="size-10">
        <Avatar
          color={props.color}
          src={props.avatar ?? ""}
          alt={props.name ?? ""}
          class="rounded-full text-lg font-bold text-accent"
        />
      </div>
      <div class="text-secondary flex flex-col items-start leading-none">
        <span class="text-base font-medium text-accent">{props.name}</span>
        <span class="text-sm font-normal text-neutral-100">
          {props.members.length} members, {onlineMembers()} online
        </span>
      </div>
    </>
  );
};

export default GroupProfile;
