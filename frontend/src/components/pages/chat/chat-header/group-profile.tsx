import { createEffect, createSignal } from "solid-js";
import Avatar from "~/components/ui/avatar";
import { useChat } from "~/context/chat";
import { GroupChatRoom } from "~/types/chat";

const GroupProfile = (props: GroupChatRoom) => {
  const { onlineUsers, activeRoom } = useChat();
  const [onlineMembers, setOnlineMembers] = createSignal(0);

  createEffect(() => {
    const room = activeRoom() as GroupChatRoom;
    setOnlineMembers(
      room?.members.filter((memId) =>
        onlineUsers()?.includes({ user: memId })
      ).length ?? 0
    );
  });

  return (
    <>
      <div class="size-10">
        <Avatar
          src={props.avatar ?? ""}
          alt={props.name ?? ""}
          class="rounded-full text-lg font-bold text-accent"
        />
      </div>
      <div class="text-secondary flex flex-col items-start leading-none">
        <span class="text-base font-medium text-accent">{props.name}</span>
        <span class="text-sm font-normal text-neutral-100">
          {/* +1 for current user */}
          {props.members.length} members, {onlineMembers() + 1} online
        </span>
      </div>
    </>
  );
};

export default GroupProfile;
