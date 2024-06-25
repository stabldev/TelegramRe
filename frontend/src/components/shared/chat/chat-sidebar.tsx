import { Show } from "solid-js";
import { useShared } from "~/context/shared";
import At from "~/icons/at";
import Close from "~/icons/close";
import Info from "~/icons/info";
import Avatar from "~/components/ui/avatar";
import { isDmChat } from "~/utils/type-guards";
import { DMChatRoom, GroupChatRoom } from "~/types/chat";
import { useChat } from "~/context/chat";

const ChatSidebar = () => {
  const { chatStore } = useChat();
  const { toggleShowSidebar } = useShared();
  const isDM = isDmChat(chatStore.activeRoom);

  const dmChatRoom = chatStore.activeRoom as DMChatRoom,
    groupChatRoom = chatStore.activeRoom as GroupChatRoom;

  return (
    <>
      <div class="absolute right-0 h-full whitespace-nowrap border-l border-neutral-300 bg-base-200 md:w-80 xl:static">
        <div class="flex h-14 items-center md:gap-4 md:px-5">
          <button
            onClick={toggleShowSidebar}
            class="grid place-items-center rounded-full text-neutral-100 hover:bg-base-300 md:size-10"
          >
            <Close class="md:size-7" />
          </button>
          <h3 class="flex items-center font-medium text-accent md:gap-3 md:text-lg">
            User Info
          </h3>
        </div>
        <div class="relative aspect-square object-cover">
          <Show
            when={isDM}
            fallback={
              <Avatar
                color={groupChatRoom.color}
                src={groupChatRoom.avatar ?? ""}
                alt={groupChatRoom.id.toString()}
                class="object-cover text-[15rem] font-bold text-accent"
              />
            }
          >
            <Avatar
              color={dmChatRoom.members[0].color}
              src={dmChatRoom.members[0].avatar ?? ""}
              alt={
                dmChatRoom.members[0].full_name ??
                dmChatRoom.members[0].username
              }
              class="object-cover text-[15rem] font-bold text-accent"
            />
          </Show>
          <div class="absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-end bg-gradient-to-t from-base-200/50 to-transparent md:gap-1.5 md:px-5 md:py-2">
            <span class="text-xl font-medium leading-none text-accent">
              {isDM ? dmChatRoom.members[0].full_name : groupChatRoom.name}
            </span>
            <span class="text-sm leading-none text-accent/50">
              last seen recently
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-3 p-5 text-accent">
          <div class="grid grid-cols-8">
            <At class="col-span-1 size-6 self-center text-neutral-100" />
            <div class="col-span-7 flex flex-col">
              <span>
                {isDM ? dmChatRoom.members[0].username : groupChatRoom.id}
              </span>
              <span class="select-none text-sm text-neutral-100">
                Username/Id
              </span>
            </div>
          </div>
          <div class="grid grid-cols-8">
            <Info class="col-span-1 size-[1.4rem] self-center text-neutral-100" />
            <div class="col-span-7 flex flex-col">
              <span class="whitespace-pre-line">
                {isDM ? dmChatRoom.members[0].bio : groupChatRoom.bio}
              </span>
              <span class="select-none text-sm text-neutral-100">Bio</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
