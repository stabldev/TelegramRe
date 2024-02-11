import { Show, createSignal } from "solid-js";
import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";
import { ChatFileModal } from "~/components/shared/chat/chat-file-modal";

interface Props {
	onMessage: (e: CustomEvent) => void;
}

export const ChatInput = (props: Props) => {
	const [message, setMessage] = createSignal("");
	const [showFileModel, setShowFileModel] = createSignal(false);
	const [file, setFile] = createSignal<File>();

	const dispatch = createEventDispatcher(props);
	let inputRef: HTMLTextAreaElement;

	const handleSubmit = (e?: SubmitEvent) => {
		e?.preventDefault();
		// if no value then dont add empty message
		if (!message()) return;
		// else dispatch custom event
		const detail = {
			content: message(),
			type: "text",
		};
		dispatch("message", detail, { cancelable: true });
		setMessage(""); // clear input
		inputRef.focus();
	};

	const handleFileSubmit = (e: CustomEvent) => {
		dispatch("message", e.detail, { cancelable: true });
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

	return (
		<>
			<Show when={showFileModel()}>
				<ChatFileModal
					file={file()!}
					onModalClose={() => setShowFileModel(false)}
					onFileSubmit={handleFileSubmit}
				/>
			</Show>
			<form
				onSubmit={handleSubmit}
				class="absolute bottom-0 flex w-full items-end gap-3 bg-stone-900 p-3"
			>
				<input type="file" id="file-input" class="hidden" onChange={handleFileChange} />
				<label
					for="file-input"
					class="cursor-pointer text-2xl text-white/50 transition-colors hover:text-white/75"
				>
					<Clip />
				</label>
				<TextareaAutosize
					ref={(ref) => (inputRef = ref)}
					value={message()}
					onInput={(e) => setMessage(e.currentTarget.value)}
					onKeyDown={handleKeyDown}
					class="flex-1 resize-none border-none bg-transparent text-sm text-white outline-none [scrollbar-width:none]"
					placeholder="Write a message..."
					maxRows={5}
				/>
				<button
					type="button"
					class="text-xl text-white/50 transition-colors hover:text-white/75"
				>
					<Emoji />
				</button>
				<button
					type="submit"
					class="text-xl text-white/50 transition-colors hover:text-white/75"
				>
					<Show
						when={message()}
						fallback={<Mic />}
					>
						<Send />
					</Show>
				</button>
			</form>
		</>
	);
};
