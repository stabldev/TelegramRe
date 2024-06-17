import { A, useParams } from "@solidjs/router";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { useAuth } from "~/context/auth";
import Tick from "~/icons/tick";
import type { ChatRoom } from "~/types/chat";
import { useChat } from "~/context/chat";
import Verified from "~/icons/verified";
import Photo from "~/icons/photo";
import Gif from "~/icons/gif";
import { cn } from "~/functions/cn";
import Avatar from "~/components/ui/avatar";

const ProfileItem = (props: ChatRoom) => {
  const { user } = useAuth();
  const { onlineUsers, setActiveRoom } = useChat();
  const params = useParams<{ room: string }>();

  const [isActive, setIsActive] = createSignal(false);
  const [isOnline, setIsOnline] = createSignal(false);

  const { message, member, unreads, id } = destructure(props);

  const chat_user = member()[0];
  const self_message = message().sender === user()?.id;
  const formated_timestamp = new FormatDate(message().timestamp)
    .format_to_relative_time;

  const handleChatClick = () => {
    setActiveRoom(props);
  };

  createEffect(() => {
    setIsOnline(
      onlineUsers()?.some((user) => user.user === chat_user.id) ? true : false
    );
  });

  createEffect(() => {
    if (!params.room) return;
    setIsActive(params.room.slice(1) === id().toString());
  });

  return (
    <A
      href={`/~${id()}`}
      class={cn(
        isActive() && "!bg-primary",
        "flex h-auto w-full select-none flex-nowrap items-center gap-3 rounded-xl border-none bg-transparent p-2 hover:bg-base-300"
      )}
      onClick={handleChatClick}
    >
      <div class="relative size-14 flex-shrink-0">
        <Avatar
          src={chat_user.avatar}
          alt={chat_user.username}
          class={"size-full rounded-full text-2xl font-bold text-accent"}
        />
        <Show when={isOnline()}>
          <div
            class="absolute bottom-0 right-0 rounded-full ring-4 md:size-2.5"
            classList={{
              "ring-primary bg-accent": isActive(),
              "ring-base-200 bg-primary": !isActive()
            }}
          />
        </Show>
      </div>
      <div class="flex w-full flex-col">
        <div class="flex items-center justify-between">
          <div class="flex items-center md:gap-1">
            <span class="text-base font-medium text-accent">
              {chat_user.full_name}
            </span>
            <Show when={chat_user.is_verified}>
              <div
                classList={{
                  "text-accent": isActive(),
                  "text-primary": !isActive()
                }}
              >
                <Verified />
              </div>
            </Show>
          </div>
          <div class="flex items-center gap-1">
            <Show when={self_message}>
              <Show
                when={message().is_read}
                fallback={
                  <Tick
                    variant="single"
                    class="flex-shrink-0 text-primary md:size-4"
                    classList={{
                      "!text-accent": isActive()
                    }}
                  />
                }
              >
                <Tick
                  variant="double"
                  class="flex-shrink-0 text-primary md:size-4"
                  classList={{
                    "!text-accent": isActive()
                  }}
                />
              </Show>
            </Show>
            <span
              class="text-xs font-normal uppercase text-neutral-200"
              classList={{
                "!text-accent": isActive()
              }}
            >
              {formated_timestamp}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between md:gap-1">
          <Show
            when={message().type === "gif"}
            fallback={
              <span
                class="line-clamp-1 text-base font-normal text-neutral-100"
                classList={{
                  "!text-accent": isActive()
                }}
              >
                {message().content}
              </span>
            }
          >
            <span
              class="text-sm text-neutral-100"
              classList={{
                "!text-accent": isActive()
              }}
            >
              GIF
            </span>
          </Show>
          <Show
            when={self_message}
            fallback={
              <Show when={unreads() && !isActive()}>
                <span class="grid place-items-center rounded-full bg-primary font-semibold leading-none md:size-5 md:text-xs">
                  {unreads()}
                </span>
              </Show>
            }
          >
            <Switch>
              <Match when={message().type === "image"}>
                <Photo class="flex-shrink-0 md:size-4" />
              </Match>
              <Match when={message().type === "gif"}>
                <Gif class="flex-shrink-0 md:size-4" />
              </Match>
            </Switch>
          </Show>
        </div>
      </div>
    </A>
  );
};

export default ProfileItem;
