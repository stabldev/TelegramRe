import { destructure } from "@solid-primitives/destructure";
import { JSX, Setter, onCleanup, onMount } from "solid-js";
import { cn } from "~/functions/cn";

interface IProps {
    triggerRef: HTMLElement | undefined;
    children: JSX.Element;
    setOpen: Setter<boolean>;
    class: string;
};

export default function Popover(props: IProps) {
    const { triggerRef, children, setOpen } = destructure(props);
    let ref: HTMLDivElement | undefined = undefined;

    const handleClickOuside = (e: UIEvent) => {
        if (ref!.contains(e.target as Node)) return;
        else {
            setOpen()((prev) => !prev);
        };
    };

    onMount(() => {
        document.addEventListener("click", handleClickOuside);
    });

    onCleanup(() => {
        document.removeEventListener("click", handleClickOuside);
    });

    return (
        <div
            ref={ref}
            class={cn(props.class, "absolute z-[9999] mt-4")}
            style={{
                "top": triggerRef()?.getBoundingClientRect().height + "px",
            }}
        >
            {children()}
        </div>
    )
};
