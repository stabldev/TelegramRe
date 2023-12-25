import { Show, createSignal } from "solid-js";
import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import TextareaAutosize from "solid-textarea-autosize";
import Emoji from "~/icons/emoji";
import Mic from "~/icons/mic";
import Send from "~/icons/send";
import Clip from "~/icons/clip";

interface Props {
	onMessage: (e: CustomEvent<string>) => void;
}

export const ChatInput = (props: Props) => {
	const [message, setMessage] = createSignal<string>("");
	const dispatch = createEventDispatcher(props);
	let inputRef: HTMLTextAreaElement;

	const handleSubmit = (e?: SubmitEvent) => {
		e?.preventDefault();
		// if no value then dont add empty message
		if (!message()) return;
		// else dispatch custom event
		dispatch("message", message(), { cancelable: true });
		setMessage(""); // clear input
		inputRef.focus();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			class="absolute bottom-0 flex w-full items-end gap-[1vw] bg-stone-900 p-[1vw] border-t-[0.1vw] border-black/50"
		>
			<button
				type="button"
				class="text-[1.75vw] text-white/50 transition-colors hover:text-white/75"
			>
				<Clip />
			</button>
			<TextareaAutosize
				ref={(ref) => (inputRef = ref)}
				value={message()}
				onInput={(e) => setMessage(e.currentTarget.value)}
				onKeyDown={handleKeyDown}
				class="flex-1 resize-none border-none bg-transparent text-[1vw] text-white outline-none [scrollbar-width:none]"
				placeholder="Write a message..."
				maxRows={5}
			/>
			<button
				type="button"
				class="text-[1.5vw] text-white/50 transition-colors hover:text-white/75"
			>
				<Emoji />
			</button>
			<button
				type="submit"
				class="text-[1.65vw] text-white/50 transition-colors hover:text-white/75"
			>
				<Show
					when={message()}
					fallback={<Mic />}
				>
					<Send />
				</Show>
			</button>
		</form>
	);
};
