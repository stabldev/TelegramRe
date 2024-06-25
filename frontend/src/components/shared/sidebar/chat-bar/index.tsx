import SearchHeader from "./search-header";
import { For } from "solid-js";
import RoomItem from "./room-item";
import Pencil from "~/icons/pencil";
import { useChat } from "~/context/chat";

type Props = {
  toggleView: () => void;
  isLoading: boolean;
};

const ChatBar = (props: Props) => {
  const { chatStore } = useChat();

  return (
    <>
      <SearchHeader toggleView={props.toggleView} />
      <div class="overflow-y-scroll px-2 [scrollbar-width:_thin]">
        <For
          each={chatStore.chatRooms.toSorted(
            (a, b) => b.message.id - a.message.id
          )}
        >
          {(room) => <RoomItem {...room} />}
        </For>
      </div>
      <button class="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100">
        <Pencil class="size-6 text-accent" />
      </button>
    </>
  );
};

export default ChatBar;
