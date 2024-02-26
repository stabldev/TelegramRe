import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Accessor, Show, createSignal, onCleanup, onMount } from "solid-js";
import { useShared } from "~/context/shared";
import { FormatDate } from "~/functions/format-date";
import Copy from "~/icons/copy";
import Pencil from "~/icons/pencil";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";

type Props = {
    x: number;
    y: number;
    self: Accessor<boolean>;
    message: Accessor<ChatMessage>;
    onClose: (e: CustomEvent) => void;
};

export const ChatContextMenu = (props: Props) => {
    const { setEditMessage } = useShared();

    const [copied, setCopied] = createSignal(false);
    const [x, setX] = createSignal(props.x);
    const [y, setY] = createSignal(props.y);

    const dispatch = createEventDispatcher(props);
    let ref: HTMLDivElement;
    const formatedDate = new FormatDate(props.message().timestamp).format_to_relative_time;

    const handleOutsideClick = (event: MouseEvent) => {
		if (!ref.contains(event.target as HTMLElement)) {
			dispatch("close", {});
		}
	};

	onMount(() => {
        const rect = ref.getBoundingClientRect();
        setX((prev) => prev > window.innerWidth - rect.width ? prev - rect.width : prev);
        setY((prev) => prev > window.innerHeight - rect.height ? prev - rect.height : prev);

		document.addEventListener("click", handleOutsideClick);
        document.addEventListener("contextmenu", handleOutsideClick);
	});

	onCleanup(() => {
		document.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("contextmenu", handleOutsideClick);
	});

    // Functions
    const handleCopy = async () => {
        await navigator.clipboard.writeText(props.message().content);
        setCopied(true);
    };

    const handleEdit = () => {
        setEditMessage(props.message());
        dispatch("close", {});
    };

    return (
        <div
            ref={ref!}
            class="dropdown absolute"
            style={{
                top: `${y()}px`,
                left: `${x()}px`,
            }}
        >
            <div class="btn btn-base-300 z-50 flex-col gap-0 w-max h-max min-h-max select-none overflow-hidden rounded-xl border-none shadow p-1">
                <Show when={props.message().is_read && props.self()}>
                    <div
                        class="grid grid-cols-12 gap-2 px-3 py-1.5 text-start text-accent"
                    >
                        <Tick variant="double" class="col-span-2 size-full" />
                        <span class="col-span-10 text-sm font-medium">Seen {formatedDate}</span>
                    </div>
                </Show>
                <Show when={props.self()}>
                    <div
                        onClick={handleEdit}
                        class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
                    >
                        <Pencil class="col-span-2 size-full" />
                        <span class="col-span-10 text-sm font-medium">Edit</span>
                    </div>
                </Show>
                <div
                    onClick={handleCopy}
                    class="grid cursor-pointer grid-cols-12 gap-2 px-3 py-1.5 rounded-lg text-start text-accent hover:bg-base-100"
                >
                    <Copy class="col-span-2 size-full" />
                    <span class="col-span-10 text-sm font-medium">
                        {copied() ? "Copied" : "Copy"}
                    </span>
                </div>
            </div>
        </div>
    )
};