import { For, JSX, Match, Switch } from "solid-js";
import { useShared } from "~/context/shared";
import Menu from "~/icons/Menu";
import Search from "~/icons/Search";
import DMProfile from "./DmProfile";
import GroupProfile from "./GroupProfile";
import { isDmChat, isGroupChat } from "~/utils/typeGuards";
import { DMChatRoom, GroupChatRoom } from "~/types/Chat";
import { useChat } from "~/context/chat";

const ChatHeader = () => {
  const { chatStore } = useChat();
  const { toggleShowSidebar } = useShared();

  const icon_mapping: {
    [key: string]: {
      icon: JSX.Element;
      disabled: boolean;
      onClick?: () => void;
    };
  } = {
    search: {
      icon: <Search />,
      disabled: false
    },
    menu: {
      icon: <Menu variant="dots" />,
      disabled: false
    }
  };

  return (
    <div class="flex h-14 select-none items-center justify-between bg-base-200 px-5">
      <button
        onClick={toggleShowSidebar}
        class="flex items-center gap-3"
      >
        <Switch>
          <Match when={isDmChat(chatStore.activeRoom)}>
            <DMProfile {...(chatStore.activeRoom as DMChatRoom)} />
          </Match>
          <Match when={isGroupChat(chatStore.activeRoom)}>
            <GroupProfile {...(chatStore.activeRoom as GroupChatRoom)} />
          </Match>
        </Switch>
      </button>
      <div class="flex items-center gap-1">
        <For each={Object.values(icon_mapping)}>
          {(icon) => (
            <button
              onClick={icon.onClick}
              disabled={icon.disabled}
              class="grid size-10 place-items-center rounded-full text-xl text-neutral-100 hover:bg-neutral-300 disabled:pointer-events-none disabled:opacity-50"
            >
              {icon.icon}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default ChatHeader;
