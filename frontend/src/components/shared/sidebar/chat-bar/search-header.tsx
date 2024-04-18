import { destructure } from "@solid-primitives/destructure";
import { Show, createSignal, onMount } from "solid-js";
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

export const SearchHeader = (props: Props) => {
    const [showMenu, setShowMenu] = createSignal(false);

    const { toggleView } = destructure(props);
    let menuRef: HTMLButtonElement | undefined = undefined;

    return (
        <div class="flex h-14 items-center gap-3 px-3 py-2">
            <button
                ref={menuRef}
				onClick={() => setShowMenu((prev) => !prev)}
                class="flex-shrink-0 text-neutral-100 text-xl size-10 hover:bg-base-300 rounded-full grid place-items-center"
            >
                <Menu variant="bars" />
            </button>
            <Show when={showMenu() && menuRef !== undefined}>
                <Popover
                    triggerRef={menuRef}
                    setOpen={setShowMenu}
                    class="z-10 w-40 rounded-xl bg-base-300 p-1 shadow shadow-base-100/75"
                >
                    <button
                        class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
                        onClick={toggleView()}
                    >
                        <UserSettings class="size-4" />
                        <span class="text-sm font-medium">Settings</span>
                    </button>
                    <a
                        href="https://github.com/tokitouq/telegram-re/issues"
                        target="_blank"
                        class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
                    >
                        <BugReport class="size-4" />
                        <span class="text-sm font-medium">Report Bug</span>
                    </a>
                    <a
                        href="https://github.com/tokitouq/telegram-re"
                        target="_blank"
                        class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
                    >
                        <Code class="size-4" />
                        <span class="text-sm font-medium">Source</span>
                    </a>
                    <a
                        href="https://github.com/tokitouq/telegram-re/blob/main/LICENSE"
                        target="_blank"
                        class="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-start text-accent hover:bg-base-100"
                    >
                        <License class="size-4" />
                        <span class="text-sm font-medium">License</span>
                    </a>
                    <span class="flex px-3 py-1 text-xs text-secondary">
                        TG-RE version 1.0
                    </span>
                </Popover>
            </Show>
            <form class="relative flex w-full items-center size-full">
                <Search class="pointer-events-none absolute left-3.5 size-5 text-neutral-200" />
                <input
                    placeholder="Search"
                    type="text"
                    class="size-full rounded-full border-none bg-base-300 pr-3.5 pl-11 text-accent placeholder:text-neutral-200 caret-neutral-200 outline-none ring-primary focus:ring-2"
                />
            </form>
        </div>
    );
};
