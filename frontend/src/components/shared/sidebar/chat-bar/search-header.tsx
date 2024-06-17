import { destructure } from "@solid-primitives/destructure";
import { Show, createSignal } from "solid-js";
import Popover from "~/components/ui/popover";
import Code from "~/icons/code";
import License from "~/icons/license";
import Menu from "~/icons/menu";
import BugReport from "~/icons/report";
import Search from "~/icons/search";
import UserSettings from "~/icons/settings/user";

type Props = {
  toggleView: () => void;
};

const SearchHeader = (props: Props) => {
  const [showMenu, setShowMenu] = createSignal(false);

  const { toggleView } = destructure(props);
  let menuRef: HTMLButtonElement | undefined = undefined;

  return (
    <div class="flex h-14 items-center gap-3 px-3 py-2">
      <button
        ref={menuRef}
        onClick={() => setShowMenu((prev) => !prev)}
        class="grid size-10 flex-shrink-0 place-items-center rounded-full text-xl text-neutral-100 hover:bg-base-300"
      >
        <Menu variant="bars" />
      </button>
      <Show when={showMenu() && menuRef !== undefined}>
        <Popover
          triggerRef={menuRef}
          setOpen={setShowMenu}
          position="bottom-left"
          class="z-50 h-max w-52 rounded-xl bg-base-100 p-1"
        >
          <button
            class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
            onClick={toggleView()}
          >
            <UserSettings class="size-4" />
            <span class="text-sm font-medium text-accent">Settings</span>
          </button>
          <a
            href="https://github.com/moonlitgrace/telegram-re-monorepo/issues"
            target="_blank"
            class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
          >
            <BugReport class="size-4" />
            <span class="text-sm font-medium text-accent">Report Bug</span>
          </a>
          <a
            href="https://github.com/moonlitgrace/telegram-re-monorepo/"
            target="_blank"
            class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
          >
            <Code class="size-4" />
            <span class="text-sm font-medium text-accent">Source</span>
          </a>
          <a
            href="https://github.com/moonlitgrace/telegram-re-monorepo/blob/main/LICENSE"
            target="_blank"
            class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
          >
            <License class="size-4" />
            <span class="text-sm font-medium text-accent">License</span>
          </a>
          <span class="mx-auto flex w-max px-3 py-1 pt-1.5 text-xs text-neutral-100">
            Telegram Web RE 1.0
          </span>
        </Popover>
      </Show>
      <form class="relative flex size-full w-full items-center">
        <input
          placeholder="Search"
          type="text"
          class="peer size-full rounded-full border-none bg-base-300 pl-11 pr-3.5 text-accent caret-neutral-200 outline-none ring-primary placeholder:text-neutral-200 focus:bg-base-200 focus:ring-2"
        />
        <Search class="pointer-events-none absolute left-3.5 size-5 text-neutral-200 peer-focus:text-primary" />
      </form>
    </div>
  );
};

export default SearchHeader;
