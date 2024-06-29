import { A, useParams } from "@solidjs/router";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import type { ChatRoom, DMChatRoom, GroupChatRoom } from "~/types/Chat";
import { cn } from "~/functions/cn";
import DMRoom from "./room/Dm";
import GroupRoom from "./room/Group";
import { isDmChat, isGroupChat } from "~/utils/typeGuards";

const RoomItem = (props: ChatRoom) => {
  const params = useParams<{ room: string }>();
  const [isActive, setIsActive] = createSignal(false);

  createEffect(() => {
    if (!params.room) return;
    setIsActive(params.room.slice(1) === props.id.toString());
  });

  return (
    <A
      href={`/~${props.id}`}
      class={cn(
        isActive() && "!bg-primary",
        "flex h-auto w-full select-none flex-nowrap items-center gap-3 rounded-xl border-none bg-transparent p-2 hover:bg-base-300"
      )}
    >
      <Switch>
        <Match when={isDmChat(props)}>
          <DMRoom
            room={props as DMChatRoom}
            isActive={isActive()}
          />
        </Match>
        <Match when={isGroupChat(props)}>
          <GroupRoom
            room={props as GroupChatRoom}
            isActive={isActive()}
          />
        </Match>
      </Switch>
    </A>
  );
};

export default RoomItem;
