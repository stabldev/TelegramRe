import { destructure } from "@solid-primitives/destructure";
import { JSX, Setter, createSignal, onCleanup, onMount } from "solid-js";
import { cn } from "~/functions/cn";
import { Motion } from "solid-motionone";
import { Portal } from "solid-js/web";

type Position = "top-left" |
                "top-right" |
                "bottom-left" |
                "bottom-right";

interface IProps {
    triggerRef: HTMLElement | undefined;
    children: JSX.Element;
    setOpen: Setter<boolean>;
    class?: string;
    position: Position;
};

export default function Popover(props: IProps) {
    const { triggerRef, children, setOpen, position } = destructure(props);

    const [xPos, setXPos] = createSignal(0);
    const [yPos, setYPos] = createSignal(0);

    let ref: HTMLDivElement | undefined = undefined;

    const originMapping = {
        "bottom-left": "top left",
        "bottom-right": "top right",
        "top-left": "bottom left",
        "top-right": "bottom right"
    };

    const handleClickOuside = (e: UIEvent) => {
        if (ref!.contains(e.target as Node)) return;
        else {
            setOpen()(false);
        };
    };

    onMount(() => {
        const rect = triggerRef()!.getBoundingClientRect();

        switch(position()) {
            case "top-right":
                setXPos(rect.x - (ref!.offsetWidth - rect.width));
                setYPos(rect.y - ref!.offsetHeight);
                break;

            case "bottom-left":
                setXPos(rect.x);
                setYPos(rect.y + rect.height);
                break;

            default:
                break;
        };

        document.addEventListener("click", handleClickOuside);
        document.addEventListener("contextmenu", handleClickOuside);
    });

    onCleanup(() => {
        document.removeEventListener("click", handleClickOuside);
        document.removeEventListener("contextmenu", handleClickOuside);
    });

    return (
        <Portal>
            <Motion.div
                animate={{
                    opacity: [0, 1],
                    scale: [0.95, 1],
                }}
                transition={{ duration: 0.15, easing: "ease-out" }}
                ref={ref}
                class={cn(props.class, "absolute z-[9999]")}
                classList={{
                    "-mt-5": position().includes("top"),
                    "mt-3": position().includes("bottom"),
                }}
                style={{
                    "top": yPos() + "px",
                    "left": xPos() + "px",
                    "transform-origin": originMapping[position()],
                }}
            >
                {children()}
            </Motion.div>
        </Portal>
    )
};
