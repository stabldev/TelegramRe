import { Show, createEffect, createSignal } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { FormatDate } from "~/functions/format-date";
import Tick from "~/icons/tick";
import type { ChatMessage } from "~/types/chat";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { useChat } from "~/context/chat";
import ChatContextMenu from "~/components/shared/chat/chat-context-menu";
import { Portal } from "solid-js/web";
import { isGroupChat } from "~/utils/type-guards";
import { activeRoom } from "~/stores/chatStore";

interface Props {
  message: ChatMessage;
  self: boolean;
  firstMsg: boolean;
  lastMsg: boolean;
}

const ChatBubble = (props: Props) => {
  const { socket } = useChat();
  const [showContextMenu, setShowContextMenu] = createSignal(false);
  const [contextPos, setContextPos] = createSignal({ x: 0, y: 0 });

  const { message, self, firstMsg, lastMsg } = destructure(props);
  const formatedDate = new FormatDate(message().created_at)
    .format_to_relative_time;

  let el: HTMLDivElement;
  const useVisibilityObserver = createVisibilityObserver({ threshold: 1 });
  const visible = useVisibilityObserver(() => el);

  createEffect(() => {
    visible() &&
      !self() &&
      !message().is_read &&
      handleReadMessage(message().id);
  });

  async function handleReadMessage(id: number) {
    message().is_read = true;
    // send socket action
    socket()!.send(
      JSON.stringify({
        action: "read_message",
        message_id: id,
        room_id: activeRoom.id
      })
    );
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextPos({
      x: e.x,
      y: e.y
    });
    setShowContextMenu(true);
  };

  return (
    <>
      <Show when={showContextMenu()}>
        <Portal>
          <ChatContextMenu
            x={contextPos().x}
            y={contextPos().y}
            self={self}
            message={message}
            onClose={() => setShowContextMenu(false)}
          />
        </Portal>
      </Show>
      <div
        ref={(ref) => {
          el = ref;
        }}
        onContextMenu={handleContextMenu}
        class="relative flex w-max max-w-md flex-col rounded-2xl px-2.5 py-1 text-accent"
        classList={{
          "bg-primary rounded-r-lg": self(),
          "bg-base-200 rounded-l-lg": !self(),
          "!p-0 !max-w-60": message().type === "image",
          "!p-0 overflow-visible bg-transparent": message().type === "gif",
          "rounded-tr-2xl": self() && firstMsg(),
          "rounded-br-none": self() && lastMsg(),
          "rounded-tl-2xl": !self() && firstMsg(),
          "rounded-bl-none": !self() && lastMsg()
        }}
      >
        <Show when={isGroupChat(activeRoom) && firstMsg() && !self()}>
          {/* TODO: redirect to user chat room */}
          <a
            href={"/@" + message().sender.username}
            class="font-medium md:text-sm"
            style={{ color: message().sender.color }}
          >
            {message().sender.full_name || "~" + message().sender.username}
          </a>
        </Show>
        <Show when={message().type == "image" || message().type === "gif"}>
          <img
            src={message().file!}
            alt="Image"
            loading="lazy"
            class="cursor-pointer"
            classList={{
              "rounded-lg": message().type === "gif"
            }}
          />
        </Show>
        <Show when={message().type === "gif"}>
          <span class="absolute left-0 top-0 m-1 w-max rounded-md bg-base-300/50 p-1 text-xs text-accent/80">
            GIF
          </span>
        </Show>
        <div
          class="flex w-full gap-1"
          classList={{
            "px-2.5 pb-1": message().type === "image",
            "absolute bottom-0 right-0 p-1 bg-base-300/50 w-max rounded-md m-1":
              message().type === "gif"
          }}
        >
          <span class="whitespace-pre-line text-base leading-snug text-accent">
            {message().content}
          </span>
          <Show when={message().edited}>
            <span class="ml-auto select-none self-end text-[0.7rem] italic leading-none text-accent/80">
              edited
            </span>
          </Show>
          <span
            classList={{
              "ml-auto": !message().edited
            }}
            class="select-none self-end text-xs uppercase leading-none text-accent/50"
          >
            {formatedDate}
          </span>
          <Show when={self()}>
            <Show
              when={message().is_read}
              fallback={
                <Tick
                  variant="single"
                  class="flex-shrink-0 self-end text-accent md:size-3.5"
                />
              }
            >
              <Tick
                variant="double"
                class="flex-shrink-0 self-end text-accent md:size-4"
              />
            </Show>
          </Show>
        </div>
        <Show when={lastMsg()}>
          <svg
            viewBox="0 0 11 20"
            class="absolute -bottom-px md:size-5"
            classList={{
              "fill-base-200 left-0 md:-start-3": !self(),
              "scale-x-[-1] fill-primary right-0 md:-end-3 ": self()
            }}
          >
            <use href="#message-tail-filled">
              <symbol
                id="message-tail-filled"
                viewBox="0 0 11 20"
              >
                <g
                  transform="translate(9 -14)"
                  fill="inherit"
                  fill-rule="evenodd"
                >
                  <path
                    d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z"
                    transform="matrix(1 0 0 -1 0 49)"
                    id="corner-fill"
                    fill="inherit"
                  ></path>
                </g>
              </symbol>
            </use>
          </svg>
        </Show>
      </div>
    </>
  );
};

export default ChatBubble;
