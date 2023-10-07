import { Show, createSignal } from "solid-js";
import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import TextareaAutosize from "solid-textarea-autosize";
import Clip from "../../assets/icons/Clip";
import Emoji from "../../assets/icons/Emoji";
import Mic from "../../assets/icons/Mic";
import Send from "../../assets/icons/Send";

interface Props {
  	onMessage: (e: CustomEvent<string>) => void;
};

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
		};
	};

	return (
		<form onSubmit={handleSubmit} class="absolute bottom-0 w-full flex gap-[1vw] items-end bg-stone-900 p-[1vw]">
			<button
				type="button"
				class="text-[1.75vw] text-white/50 hover:text-white/75 transition-colors"
			>
				<Clip />
			</button>
			<TextareaAutosize
				ref={(ref) => inputRef = ref}
				value={message()}
				onInput={(e) => setMessage(e.currentTarget.value)}
				onKeyDown={handleKeyDown}
				class="resize-none flex-1 border-none outline-none bg-transparent text-white text-[1vw] [scrollbar-width:none]"
				placeholder="Write a message..."
				maxRows={5}
			/>

			<button
				type="button"
				class="text-[1.5vw] text-white/50 hover:text-white/75 transition-colors"
			>
				<Emoji />
			</button>
			<button
				type="submit"
				class="text-[1.65vw] text-white/50 hover:text-white/75 transition-colors"
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