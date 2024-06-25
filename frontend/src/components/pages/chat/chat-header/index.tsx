import { For, JSX, Match, Switch } from "solid-js";
import { useShared } from "~/context/shared";
import Menu from "~/icons/menu";
import Search from "~/icons/search";
import DMProfile from "./dm-profile";
import GroupProfile from "./group-profile";
import { isDmChat, isGroupChat } from "~/utils/type-guards";
import { activeRoom } from "~/stores/chatStore";
import { DMChatRoom, GroupChatRoom } from "~/types/chat";

const ChatHeader = () => {
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
          <Match when={isDmChat(activeRoom)}>
            <DMProfile {...(activeRoom as DMChatRoom)} />
          </Match>
          <Match when={isGroupChat(activeRoom)}>
            <GroupProfile {...(activeRoom as GroupChatRoom)} />
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
