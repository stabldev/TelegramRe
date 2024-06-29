import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Close from "~/icons/Close";
import { filesize } from "filesize";
import Send from "~/icons/Send";
import Emoji from "~/icons/Emoji";

type Props = {
  file: File;
  onModalClose: () => void;
  onFileSubmit: (e: CustomEvent) => void;
};

const ChatFileModal = (props: Props) => {
  const [preview, setPreview] = createSignal("");
  const [caption, setCaption] = createSignal("");
  const [sending, setSending] = createSignal(false);

  const dispatch = createEventDispatcher(props);

  const inputRef: HTMLInputElement | undefined = undefined;

  const handleCleanComponent = () => {
    setSending(false);
    setPreview("");
    setCaption("");
  };

  const handleFileClose = () => {
    if (sending()) return;

    handleCleanComponent();
    dispatch("modalClose");
  };

  const handleFileSubmit = (e?: SubmitEvent) => {
    setSending(true);
    e?.preventDefault();
    const detail = {
      content: {
        file: props.file,
        message: caption()
      },
      type: props.file.type === "image/gif" ? "gif" : "image"
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
    inputRef!.focus();
  });

  onCleanup(() => {
    handleCleanComponent();
  });

  createEffect(() => {
    if (props.file instanceof File) {
      const objectUrl = URL.createObjectURL(props.file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  });

  return (
    <>
      <div class="flex h-max w-max flex-col rounded-2xl bg-base-200 text-accent">
        <div class="flex items-center justify-between md:p-2 md:pl-4">
          <span class="text-lg font-medium">
            Send {props.file.type === "image/gif" ? "GIF" : "Photo"}
          </span>
          <button
            onClick={handleFileClose}
            class="grid size-10 place-items-center rounded-full text-neutral-100 hover:bg-base-300"
          >
            <Close class="md:size-7" />
          </button>
        </div>
        <div class="flex items-start gap-3 px-4">
          <img
            src={preview()}
            alt={props.file.name}
            class="size-16 flex-shrink-0 rounded-lg object-cover"
          />
          <div class="flex flex-col">
            <span>{props.file.name}</span>
            <span class="text-sm text-neutral-100">
              {filesize(props.file.size, {
                standard: "jedec"
              })}
            </span>
          </div>
        </div>
        <form
          onSubmit={handleFileSubmit}
          class="flex items-end gap-3 p-3 md:pl-4"
        >
          <button class="text-neutral-100 transition-colors hover:text-primary">
            <Emoji class="md:size-6" />
          </button>
          <TextareaAutosize
            ref={inputRef}
            disabled={props.file.type === "image/gif"}
            value={caption()}
            onInput={(e) => setCaption(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            class="flex-1 resize-none border-none bg-transparent text-accent outline-none [scrollbar-width:none]"
            placeholder="Add a caption..."
            maxRows={5}
          />
          <button
            disabled={sending()}
            type="submit"
            class="flex items-center rounded-lg bg-primary p-2 px-4 font-medium uppercase disabled:opacity-50 md:gap-2"
          >
            Send <Send />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatFileModal;
