import { A, useParams } from "@solidjs/router";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import type { ChatRoom } from "~/types/chat";
import { cn } from "~/functions/cn";
import DMRoom from "./room/dm";
import GroupRoom from "./room/group";

const RoomItem = (props: ChatRoom) => {
  const params = useParams<{ room: string }>();
  const [isActive, setIsActive] = createSignal(false);

  console.log(props);

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
        <Match when={props.type === "DM"}>
          <DMRoom
            room={props}
            isActive={isActive()}
          />
        </Match>
        <Match when={props.type === "GROUP"}>
          <GroupRoom
            room={props}
            isActive={isActive()}
          />
        </Match>
      </Switch>
    </A>
  );
};

export default RoomItem;
