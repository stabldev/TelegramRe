import { destructure } from "@solid-primitives/destructure";
import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Accessor, Show, createSignal, onCleanup, onMount } from "solid-js";
import { useShared } from "~/context/shared";
import { FormatDate } from "~/functions/format-date";
import Copy from "~/icons/copy";
import Delete from "~/icons/delete";
import Pencil from "~/icons/pencil";
import Tick from "~/icons/tick";
import { ChatMessage } from "~/types/chat.types";
import { Motion } from "solid-motionone";

type Props = {
    x: number;
    y: number;
    self: Accessor<boolean>;
    message: Accessor<ChatMessage>;
    onClose: (e: CustomEvent) => void;
};

type Direction = "left" | "right";

const ChatContextMenu = (props: Props) => {
    const { setEditMessage } = useShared();
    const { x: PropX, y: PropY, message } = destructure(props);

    const [copied, setCopied] = createSignal(false);
    const [x, setX] = createSignal(PropX());
    const [y, setY] = createSignal(PropY());
    const [direction, setDirection] = createSignal<Direction>("right");

    const dispatch = createEventDispatcher(props);
    let ref: HTMLDivElement;
    const formatedDate = new FormatDate(message()().timestamp)
        .format_to_relative_time;

    const handleOutsideClick = (event: MouseEvent) => {
        if (!ref.contains(event.target as HTMLElement)) {
            dispatch("close", {});
        }
    };

    onMount(() => {
        const rect = ref.getBoundingClientRect();

        setX((prev) => {
            if (prev > window.innerWidth - rect.width) {
                setDirection("left");
                return prev - rect.width;
            } else {
                return prev;
            }
        });

        setY((prev) =>
            prev > window.innerHeight - rect.height ? prev - rect.height : prev
        );

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

    const handleDelete = () => {
        console.log("Perform handle delete function");
    };

    return (
        <Motion.div
            animate={{
                opacity: [0, 1],
                scale: [0.95, 1],
            }}
            transition={{ duration: 0.1, easing: "ease-out" }}
            ref={ref!}
            class="absolute rounded-xl bg-base-100 h-max w-52 z-50 p-1"
            classList={{
                "origin-top-left": direction() === "right",
                "origin-top-right": direction() === "left",
            }}
            style={{
                top: `${y()}px`,
                left: `${x()}px`,
            }}
        >
            <div>
                <Show when={props.self()}>
                    <button
                        onClick={handleEdit}
                        class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
                    >
                        <Pencil class="size-4" />
                        <span class="text-sm font-medium text-accent">Edit</span>
                    </button>
                </Show>
                <button
                    onClick={handleCopy}
                    class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-neutral-100 hover:bg-base-200/75"
                >
                    <Copy class="size-4" />
                    <span class="text-sm font-medium text-accent">
                        {copied() ? "Copied" : "Copy Text"}
                    </span>
                </button>
                <button
                    onClick={handleDelete}
                    class="flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-start text-error hover:bg-base-200/50"
                >
                    <Delete class="size-4" />
                    <span class="text-sm font-medium">Delete</span>
                </button>
                <Show when={props.message().is_read && props.self()}>
                    <div class="border-t-2 border-neutral-300 mt-1 pt-2 flex w-full items-center gap-4 px-3 py-1.5 text-start text-neutral-100">
                        <Tick
                            variant="double"
                            class="size-4"
                        />
                        <span class="text-sm font-medium">
                            Seen {formatedDate}
                        </span>
                    </div>
                </Show>
            </div>
        </Motion.div>
    );
};

export default ChatContextMenu;
