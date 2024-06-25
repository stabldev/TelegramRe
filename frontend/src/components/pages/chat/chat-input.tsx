import { Show, createEffect, createSignal } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";
import { useChat } from "~/context/chat";
import ApiEndpoints from "~/endpoints/api/api-endpoints";
import { useAuth } from "~/context/auth";
import { useShared } from "~/context/shared";
import Close from "~/icons/close";
import Popover from "~/components/ui/popover";
import ChatMediaMenu from "~/components/shared/chat/chat-media-menu";
import ChatFileModal from "~/components/shared/chat/chat-file-modal";
import Modal from "~/components/ui/modal";
import Pencil from "~/icons/pencil";
import SocketActions from "~/endpoints/socket/socket-actions";
import { activeRoom } from "~/stores/chatStore";

const ChatInput = () => {
  const [socket] = useChat();
  const { csrfToken, user } = useAuth();
  const { editMessage, isEditingMessage, setEditMessage } = useShared();

  const [message, setMessage] = createSignal("");
  const [showFileModel, setShowFileModel] = createSignal(false);
  const [showMediaPopover, setShowMediaPopover] = createSignal(false);
  const [file, setFile] = createSignal<File>();

  const [inputRef, setInputRef] = createSignal<HTMLTextAreaElement>();
  const [mediaPopoverBtnRef, setMediaPopoverBtnRef] =
    createSignal<HTMLElement>();

  const handleSubmit = (e?: SubmitEvent) => {
    e?.preventDefault();
    // if no value then dont add empty message
    if (!message()) return;
    // else dispatch custom event
    const detail = {
      content: {
        file: null,
        message: message()
      },
      type: "text"
    };

    if (isEditingMessage()) {
      socket()?.send(
        JSON.stringify({
          action: SocketActions.EDIT_MESSAGE,
          message_id: editMessage()?.id,
          new_message: message(),
          room_id: activeRoom.id
        })
      );
    } else {
      socket()?.send(
        JSON.stringify({
          action: SocketActions.MESSAGE,
          type: detail.type,
          content: detail.content,
          room_id: activeRoom.id
        })
      );
    }

    setMessage(""); // clear input
    setEditMessage(undefined);
    inputRef()?.focus();
  };

  const handleFileSubmit = async (
    e: CustomEvent<{
      type: string;
      content: {
        file: File;
        message: string;
      };
    }>
  ) => {
    try {
      const { type, content } = e.detail;

      const formData = new FormData();
      formData.append("type", type);
      formData.append("room", String(activeRoom.id));
      formData.append("sender", String(user()?.id));
      formData.append("content", content.message);
      formData.append("file", content.file);

      const res = await fetch(
        ApiEndpoints.chat.CHAT_ROOMS + activeRoom.id + "/",
        {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken()
          },
          credentials: "include",
          body: formData
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } finally {
      setShowFileModel(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) setFile(target.files[0]);
    setShowFileModel(true);
  };

  createEffect(() => {
    inputRef()?.focus();
    isEditingMessage() && inputRef()?.focus();
  });

  return (
    <>
      <Show when={showFileModel()}>
        <Modal setOpen={setShowFileModel}>
          <ChatFileModal
            file={file()!}
            onModalClose={() => setShowFileModel(false)}
            onFileSubmit={handleFileSubmit}
          />
        </Modal>
      </Show>
      <div class="mx-auto mb-5 mt-2 flex items-end px-5 md:w-[42.5rem] md:gap-2">
        <form
          onSubmit={handleSubmit}
          class="flex w-full flex-col rounded-2xl bg-base-200 p-4"
          classList={{
            "pt-2 md:gap-3": isEditingMessage()
          }}
        >
          <Show when={isEditingMessage()}>
            <div class="flex w-full items-center gap-3">
              <Pencil class="text-primary md:size-6" />
              <div class="relative flex flex-1 gap-2 overflow-y-hidden rounded-md bg-base-300 px-2 py-0.5 leading-none">
                <div class="absolute inset-y-0 left-0 bg-primary md:w-1" />
                <div class="pl-1">
                  <span class="select-none text-sm font-medium text-accent/75">
                    Edit Message
                  </span>
                  <span class="line-clamp-1 text-sm text-neutral-100">
                    {editMessage()?.content}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditMessage(undefined)}
                class="grid place-items-center rounded-full bg-transparent hover:bg-base-300 md:size-10"
              >
                <Close class="text-primary md:size-7" />
              </button>
            </div>
          </Show>
          <div class="relative flex w-full items-end gap-3">
            <input
              type="file"
              id="image-file-input"
              accept=".png,.jpg,.jpeg"
              class="hidden"
              onChange={handleFileChange}
            />
            <input
              type="file"
              id="gif-file-input"
              accept=".gif"
              class="hidden"
              onChange={handleFileChange}
            />
            <button class="text-neutral-100 transition-colors hover:text-primary">
              <Emoji class="md:size-6" />
            </button>
            <TextareaAutosize
              ref={setInputRef}
              value={isEditingMessage() ? editMessage()?.content : message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              class="flex-1 resize-none self-center border-none bg-base-200 text-accent caret-accent outline-none [scrollbar-width:none]"
              placeholder="Message"
              maxRows={5}
            />
            <button
              ref={setMediaPopoverBtnRef}
              onClick={() => setShowMediaPopover((prev) => !prev)}
              type="button"
              class="text-neutral-100 transition-colors hover:text-primary"
            >
              <Clip class="md:size-6" />
            </button>
            <Show when={showMediaPopover()}>
              <Popover
                triggerRef={mediaPopoverBtnRef()}
                setOpen={setShowMediaPopover}
                class="z-50 h-max w-52 rounded-xl bg-base-100 p-1"
                position="top-right"
              >
                <ChatMediaMenu />
              </Popover>
            </Show>
          </div>
        </form>
        <button
          type="submit"
          class="group grid aspect-square size-14 place-items-center rounded-full bg-base-200 text-neutral-100 hover:bg-primary hover:text-accent"
        >
          <Show
            when={message() || editMessage()}
            fallback={<Mic class="md:size-6" />}
          >
            <Send class="text-primary group-hover:text-accent md:size-5" />
          </Show>
        </button>
      </div>
    </>
  );
};

export default ChatInput;
