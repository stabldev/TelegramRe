import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Close from "~/icons/close";
import { filesize } from "filesize";

type Props = {
    file: File;
    onModalClose: () => void;
    onFileSubmit: (e: CustomEvent) => void;
};

export const ChatFileModal = (props: Props) => {
	const [preview, setPreview] = createSignal("");
	const [caption, setCaption] = createSignal("");
    const [sending, setSending] = createSignal(false);

    const dispatch = createEventDispatcher(props);

    let ref: HTMLDivElement;
    let inputRef: HTMLTextAreaElement;

    const handleCleanComponent = () => {
        setSending(false);
		setPreview("");
        setCaption("");
    };

    const handleFileClose = () => {
        handleCleanComponent();
        dispatch("modalClose");
	};

    const handleOutsideClick = (event: MouseEvent) => {
        if (!ref.contains(event.target as HTMLElement)) {
            dispatch("modalClose");
        };
    };

    const handleFileSubmit = (e?: SubmitEvent) => {
        setSending(true);
        e?.preventDefault();
        const detail = {
            content: {
                file: props.file,
                message: caption(),
            },
            type: "image",
        };

        dispatch("fileSubmit", detail);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleFileSubmit();
		}
	};

    onMount(() => {
        inputRef.focus();
        document.addEventListener('click', handleOutsideClick);
    });

    onCleanup(() => {
        handleCleanComponent();
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
                class="bg-stone-900 text-stone-100 rounded-xl flex flex-col gap-2"
            >
                <div class="flex items-center justify-between md:p-2 md:pl-3">
                    <span class="font-medium">Send File</span>
                    <button onClick={handleFileClose} class="text-white/75 transition-colors hover:text-white md:size-6" >
                        <Close />
                    </button>
                </div>
                <div class="flex items-center gap-3 px-3">
                    <img
                        src={preview()}
                        alt={props.file.name}
                        class="rounded-md size-16 object-cover flex-shrink-0"
                    />
                    <div class="flex flex-col">
                        <span>{props.file.name}</span>
                        <span class="text-sm text-stone-300">{filesize(props.file.size, {standard: "jedec"})}</span>
                    </div>
                </div>
                <form
                    onSubmit={handleFileSubmit}
                    class="p-2 md:pl-3 flex items-center gap-2"
                >
                    <TextareaAutosize
                        ref={inputRef!}
                        value={caption()}
                        onInput={(e) => setCaption(e.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        class="flex-1 resize-none border-none bg-transparent text-sm text-white outline-none [scrollbar-width:none]"
                        placeholder="Add a caption..."
                        maxRows={5}
                    />
                    <button
                        disabled={sending()}
                        type="submit"
                        class="bg-blue-500 rounded-lg p-2 px-4 text-sm uppercase font-medium self-end disabled:opacity-75 duration-150"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
};