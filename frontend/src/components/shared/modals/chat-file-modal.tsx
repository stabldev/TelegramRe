import { createEventDispatcher } from "@solid-primitives/event-dispatcher";
import { Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import TextareaAutosize from "solid-textarea-autosize";
import Close from "~/icons/close";
import { filesize } from "filesize";
import Send from "~/icons/send";

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

	let ref: HTMLDivElement,
		inputRef: HTMLTextAreaElement,
		dialogRef: HTMLDialogElement;

	const handleCleanComponent = () => {
		setSending(false);
		setPreview("");
		setCaption("");
		dialogRef.close();
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
		dialogRef.showModal();
		inputRef.focus();
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
			<dialog
				ref={dialogRef!}
				class="modal"
			>
				<div
					ref={ref!}
					class="modal-box flex h-max w-max flex-col gap-1 rounded-2xl bg-base-300 p-0 text-accent"
				>
					<div class="flex items-center justify-between md:p-2 md:pl-3">
						<span class="font-medium">
							Send{" "}
							{props.file.type === "image/gif" ? "GIF" : "File"}
						</span>
						<button
							onClick={handleFileClose}
							class="btn btn-circle btn-ghost h-max min-h-max w-max p-0 text-neutral-content/75"
						>
							<Close class="md:size-6" />
						</button>
					</div>
					<div class="flex items-start gap-3 px-3">
						<img
							src={preview()}
							alt={props.file.name}
							class="size-16 flex-shrink-0 rounded-lg object-cover"
						/>
						<div class="flex flex-col">
							<span>{props.file.name}</span>
							<span class="text-sm text-secondary">
								{filesize(props.file.size, {
									standard: "jedec"
								})}
							</span>
						</div>
					</div>
					<form
						onSubmit={handleFileSubmit}
						class="flex items-center gap-2 p-2 md:pl-3"
					>
						<TextareaAutosize
							disabled={props.file.type === "image/gif"}
							ref={inputRef!}
							value={caption()}
							onInput={(e) => setCaption(e.currentTarget.value)}
							onKeyDown={handleKeyDown}
							class="flex-1 resize-none border-none bg-transparent text-sm text-accent outline-none [scrollbar-width:none]"
							placeholder="Add a caption..."
							maxRows={5}
						/>
						<button
							disabled={sending()}
							type="submit"
							class="btn btn-primary h-10 min-h-full self-end px-4 disabled:bg-neutral"
						>
							Send
							<Show
								when={sending()}
								fallback={<Send />}
							>
								<span class="loading loading-spinner loading-xs" />
							</Show>
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
};
