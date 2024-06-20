import { createEffect, createSignal } from "solid-js";
import Avatar from "~/components/ui/avatar";
import { useChat } from "~/context/chat";
import { ChatRoom } from "~/types/chat";

const GroupProfile = (props: ChatRoom) => {
  const { onlineUsers, activeRoom } = useChat();
  const [onlineMembers, setOnlineMembers] = createSignal(0);

  createEffect(() => {
    setOnlineMembers(
      activeRoom()?.members.filter((mem) =>
        onlineUsers()?.includes({ user: mem.id })
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
          {onlineMembers() + 1} online
        </span>
      </div>
    </>
  );
};

export default GroupProfile;
