import { destructure } from "@solid-primitives/destructure";
import { JSX, Setter, onCleanup, onMount } from "solid-js";
import { cn } from "~/functions/cn";
import { Motion } from "solid-motionone";

interface IProps {
    triggerRef: HTMLElement | undefined;
    children: JSX.Element;
    setOpen: Setter<boolean>;
    class?: string;
};

export default function Popover(props: IProps) {
    const { triggerRef, children, setOpen } = destructure(props);
    let ref: HTMLDivElement | undefined = undefined;

    const handleClickOuside = (e: UIEvent) => {
        if (ref!.contains(e.target as Node)) return;
        else {
            setOpen()(false);
        };
    };

    onMount(() => {
        document.addEventListener("click", handleClickOuside);
        document.addEventListener("contextmenu", handleClickOuside);
    });

    onCleanup(() => {
        document.removeEventListener("click", handleClickOuside);
        document.removeEventListener("contextmenu", handleClickOuside);
    });

    return (
        <Motion.div
            animate={{
                opacity: [0, 1],
                scale: [0.95, 1],
            }}
            transition={{ duration: 0.1, easing: "ease-out" }}
            ref={ref}
            class={cn(props.class, "origin-top-left absolute z-[9999] mt-5")}
            style={{
                "top": triggerRef()?.getBoundingClientRect().height + "px",
            }}
        >
            {children()}
        </Motion.div>
    )
};
