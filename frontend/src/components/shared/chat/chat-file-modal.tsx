import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Close from "~/icons/close";

type Props = {
    file: File;
    onModalClose: () => void;
};

export const ChatFileModal = (props: Props) => {
	const [preview, setPreview] = createSignal("");
	const [caption, setCaption] = createSignal("");

    const dispatch = createEventDispatcher(props);
    let ref: HTMLDivElement;

    const handleFileClose = () => {
		setPreview("");
        setCaption("");

        dispatch("modalClose");
	};

    const handleOutsideClick = (event: MouseEvent) => {
        if (!ref.contains(event.target as HTMLElement)) {
            dispatch("modalClose");
        };
    };

    onMount(() => {
        document.addEventListener('click', handleOutsideClick);
    });

    onCleanup(() => {
        document.removeEventListener('click', handleOutsideClick);
    });

    createEffect(() => {
        if (props.file instanceof File) {
			const objectUrl = URL.createObjectURL(props.file);
			setPreview(objectUrl);
	
			return () => URL.revokeObjectURL(objectUrl);
		};
    }, []);

    return (
        <div class="absolute inset-0 grid place-items-center">
            <div
                ref={ref!}
                class="w-96 bg-stone-800 text-stone-100 rounded-xl flex flex-col gap-2"
            >
                <div class="flex items-center justify-between md:p-2 md:pl-3">
                    <span class="font-medium">Send File</span>
                    <button onClick={handleFileClose} class="text-white/75 transition-colors hover:text-white md:size-6" >
                        <Close />
                    </button>
                </div>
                <img
                    src={preview()}
                    alt={props.file.name}
                    class="h-56 w-max rounded-md self-center object-contain"
                />
                <div class="p-2 md:pl-3 flex items-center gap-2">
                    <TextareaAutosize
                        value={caption()}
                        onInput={(e) => setCaption(e.currentTarget.value)}
                        class="flex-1 resize-none border-none bg-transparent text-sm text-white outline-none [scrollbar-width:none]"
                        placeholder="Add a caption..."
                        maxRows={5}
                    />
                    <button class="bg-blue-500 rounded-lg p-2 px-4 text-sm uppercase font-medium self-end">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
};