import { Show, createEffect, createSignal } from "solid-js";
import Avatar from "~/components/ui/avatar";
import { useChat } from "~/context/chat";
import { activeRoom } from "~/stores/chatStore";
import { DMChatRoom } from "~/types/chat";

const DMProfile = (props: DMChatRoom) => {
  const [isOnline, setIsOnline] = createSignal(false);
  const { onlineUsers } = useChat();

  createEffect(() => {
    const room = activeRoom as DMChatRoom;
    room &&
      setIsOnline(
        onlineUsers()?.some((user) => user.user === room.members[0].id)
          ? true
          : false
      );
  });

  return (
    <>
      <div class="size-10">
        <Avatar
          color={props.members[0].color}
          src={props.members[0].avatar ?? ""}
          alt={props.members[0].full_name ?? "Telegram User"}
          class="rounded-full text-lg font-bold text-accent"
        />
      </div>
      <div class="text-secondary flex flex-col items-start leading-none">
        <span class="text-base font-medium text-accent">
          {props.members[0].full_name}
        </span>
        <Show
          when={isOnline()}
          fallback={
            <span class="text-sm font-normal text-neutral-100">
              last seen recently
            </span>
          }
        >
          <span class="text-xs font-normal">online</span>
        </Show>
      </div>
    </>
  );
};

export default DMProfile;
